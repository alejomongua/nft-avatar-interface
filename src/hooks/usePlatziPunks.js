import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import PlatziPunksArtifact from '../config/artifacts/PlatziPunks'

export const usePlatziPunks = () => {
    const { active, library, chainId } = useWeb3React();

    const platziPunks = useMemo(
        () => {
            const abi = PlatziPunksArtifact.abi
            const address = PlatziPunksArtifact.address[chainId]
            if (active) {
                return new library.eth.Contract(abi, address)
            }
        },
        [active, chainId, library?.eth?.Contract]
    );

    return platziPunks
}
