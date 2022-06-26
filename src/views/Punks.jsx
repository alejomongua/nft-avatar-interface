import { useWeb3React } from '@web3-react/core'
import PunkCard from '../components/PunkCard'
import Loading from '../components/Loading'
import RequestAccess from '../components/RequestAccess'
import { read } from '@popperjs/core'
import { usePlatziPunksData } from '../hooks/usePlatziPunksData'

const Punks = () => {
    const { active } = useWeb3React()
    const { punks, loading } = usePlatziPunksData()

    if (!active) { return <RequestAccess></RequestAccess> }

    return <>
        {
            loading ? <Loading />
                : <div className='grid gap-4 grid-cols-3'>
                    {
                        punks.map(({ name, tokenId, image }) =>
                            <PunkCard key={tokenId} image={image} name={name} />
                        )
                    }
                </div>
        }
    </>
}

export default Punks;
