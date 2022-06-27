import { useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import PunkCard from '../components/PunkCard'
import Loading from '../components/Loading'
import RequestAccess from '../components/RequestAccess'
import { usePlatziPunksData } from '../hooks/usePlatziPunksData'

const Punks = () => {
    const { search } = useLocation()
    const [address, setAddress] = useState(new URLSearchParams(search).get('address'))
    const [submitted, setSubmitted] = useState(true)
    const [validAddress, setValidAddress] = useState(true)
    const { active, library } = useWeb3React()
    const addressChangeHandler = ({ target: { value } }) => {
        setAddress(value)
        setSubmitted(false)
        setValidAddress(false)
    }
    const { punks, loading, update } = usePlatziPunksData(
        submitted && validAddress ? address : null
    )
    const navigate = useNavigate()
    const submit = event => {
        event.preventDefault()
        setSubmitted(true)

        if (!address) {
            navigate("/punks")
            return
        }
        const isValidAddress = library.utils.isAddress(address)
        setValidAddress(isValidAddress)
        if (!isValidAddress) {
            navigate(`/punks`)
            return
        }
        navigate(`/punks?address=${address}`)

    }

    if (!active) { return <RequestAccess></RequestAccess> }

    return <>
        <form
            className="w-full flex"
            onSubmit={submit}
        >
            <input
                type="text"
                value={address ?? ''}
                className="w-3/4 p-2 border rounded"
                placeholder="Search by owner"
                onChange={addressChangeHandler} />
            <button
                type="submit"
                className="bg-blue-500 text-blue-100 px-2 ml-4 rounded shadow"
            >
                Filter by owner
            </button>
        </form>
        {
            submitted && !validAddress &&
            <div
                className="w-full my-4 text-sm text-gray-600"
            >Invalid address</div>
        }
        {
            loading ? <Loading />
                : <div className='grid gap-4 grid-cols-3'>
                    {
                        punks.map(({ name, image }, tokenId) =>
                            <Link key={tokenId} to={`/punks/${tokenId}`}>
                                <PunkCard image={image} name={name} />
                            </Link>
                        )
                    }
                </div>
        }
    </>
}

export default Punks;
