import { useParams } from 'react-router-dom'
import { Button, useToast } from '@chakra-ui/react'
import { useState } from 'react'
import { useWeb3React } from '@web3-react/core'

import PunkCard from '../components/PunkCard'
import Loading from '../components/Loading'
import RequestAccess from '../components/RequestAccess'
import { usePlatziPunkData } from '../hooks/usePlatziPunksData'
import { usePlatziPunks } from "../hooks/usePlatziPunks";

const Punk = () => {
    const { tokenId } = useParams()
    const { account, active, library } = useWeb3React()
    const { punk, loading, update } = usePlatziPunkData(tokenId)
    const [transfering, setTransfering] = useState(false)
    const platziPunks = usePlatziPunks();
    const toast = useToast()
    const {
        image,
        name,
        tokenDNA,
        owner,
        attributes,
    } = punk


    const transfer = async () => {
        setTransfering(true)
        const address = prompt('Paste destination address')
        const isAddress = library.utils.isAddress(address)
        if (!isAddress) {
            toast({
                title: 'Wrong address',
                description: `Input address ${address} is not a valid ethereum address`,
                status: 'error',
            })
            setTransfering(false)
            return
        }
        platziPunks.methods
            .safeTransferFrom(
                account, // _from
                address, // _to
                tokenId // _tokenId
            )
            .send({ from: account })
            .on("transactionHash", txHash => {
                toast({
                    duration: 3000,
                    title: "Transaction send",
                    description: `Transaction hash: ${txHash}`,
                    status: 'info'
                })
            })
            .on("receipt", () => {
                toast({
                    duration: 3000,
                    title: "Transaction receipt",
                    description: `Transfered successfully, ${punk.name} now belongs to ${address}`,
                    status: 'success'
                })
                setTransfering(false)
                update()
            })
            .on("error", error => {
                toast({
                    duration: 3000,
                    title: "Transaction failed",
                    description: error.message,
                    status: 'error'
                })

                setTransfering(false)
            })

    }

    if (!active) { return <RequestAccess></RequestAccess> }

    return <>
        {
            loading ? <Loading />
                : <div className="flex">
                    <div>
                        <PunkCard key={tokenId} image={image} name={name} />
                        <Button
                            colorScheme={"green"}
                            disabled={account != owner}
                            className="my-4"
                            isLoading={transfering}
                            onClick={transfer}
                        >
                            {
                                account != owner ?
                                    "Only owner can transfer" :
                                    "Transfer"
                            }
                        </Button>
                    </div>
                    <div className='px-3'>
                        <h2 className="text-2xl font-bold my-4">
                            {name}
                        </h2>
                        <div>
                            <b className='font-bold'>
                                DNA:
                            </b>
                            <span className='mx-3'>
                                {tokenDNA}
                            </span>
                        </div>
                        <div>
                            <b className='font-bold'>
                                Owner:
                            </b>
                            <span className='mx-3'>
                                {owner}
                            </span>
                        </div>
                        <div>
                            <h3 className='text-lg font-bold'>
                                Attributes
                            </h3>
                            <table className='w-full'>
                                {
                                    Object.entries(attributes).map(([key, value]) => (
                                        <tr className='w-full my-2 py-2' key={`{key}`}>
                                            <td className='w-1/2'>
                                                {key}
                                            </td>
                                            <td>
                                                <span className='bg-gray-300 p-1 text-sm'>
                                                    {value}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </table>
                        </div>
                    </div>
                </div>
        }
    </>
}

export default Punk;
