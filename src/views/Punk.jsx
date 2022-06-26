import { useWeb3React } from '@web3-react/core'
import PunkCard from '../components/PunkCard'
import Loading from '../components/Loading'
import RequestAccess from '../components/RequestAccess'
import { usePlatziPunkData } from '../hooks/usePlatziPunksData'
import { useParams } from 'react-router-dom'
import { Button } from '@chakra-ui/react'

const Punk = () => {
    const { tokenId } = useParams()
    const { account, active } = useWeb3React()
    const { punk, loading } = usePlatziPunkData(tokenId)
    const {
        image,
        name,
        tokenDNA,
        owner,
        attributes,
    } = punk

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
