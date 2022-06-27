import { useCallback, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";

// import PlatziPunksArtifact from '../config/artifacts/PlatziPunks'
import { usePlatziPunks } from "./usePlatziPunks";

const getPunkData = async ({ platziPunks, tokenId }) => {
    const [
        tokenURI,
        tokenDNA,
        owner,
    ] = await Promise.all([
        platziPunks.methods.tokenURI(tokenId).call(),
        platziPunks.methods.tokenDNA(tokenId).call(),
        platziPunks.methods.ownerOf(tokenId).call(),
    ])
    const [
        accessoriesType,
        clotheColor,
        clotheType,
        eyeType,
        eyeBrowType,
        facialHairColor,
        facialHairType,
        hairColor,
        hatColor,
        graphicType,
        mouthType,
        skinColor,
        topType,
    ] = await Promise.all([
        platziPunks.methods.getAccessoriesType(tokenDNA).call(),
        platziPunks.methods.getClotheColor(tokenDNA).call(),
        platziPunks.methods.getClotheType(tokenDNA).call(),
        platziPunks.methods.getEyeType(tokenDNA).call(),
        platziPunks.methods.getEyeBrowType(tokenDNA).call(),
        platziPunks.methods.getFacialHairColor(tokenDNA).call(),
        platziPunks.methods.getFacialHairType(tokenDNA).call(),
        platziPunks.methods.getHairColor(tokenDNA).call(),
        platziPunks.methods.getHatColor(tokenDNA).call(),
        platziPunks.methods.getGraphicType(tokenDNA).call(),
        platziPunks.methods.getMouthType(tokenDNA).call(),
        platziPunks.methods.getSkinColor(tokenDNA).call(),
        platziPunks.methods.getTopType(tokenDNA).call(),
    ])

    const responseMetadata = await fetch(tokenURI)
    const metadata = await responseMetadata.json()

    return {
        tokenURI,
        attributes: {
            accessoriesType,
            clotheColor,
            clotheType,
            eyeType,
            eyeBrowType,
            facialHairColor,
            facialHairType,
            hairColor,
            hatColor,
            graphicType,
            mouthType,
            skinColor,
            topType,
        },
        tokenDNA,
        owner,
        ...metadata
    }
}

export const usePlatziPunksData = owner => {
    const { library } = useWeb3React()
    const [punks, setPunks] = useState([])
    const [loading, isLoading] = useState(true)
    const platziPunks = usePlatziPunks()

    const update = useCallback(async () => {
        if (platziPunks) {
            let punks
            isLoading(true)
            if (library.utils.isAddress(owner)) {
                let balanceOfOwner = await platziPunks.methods.balanceOf(owner).call()
                balanceOfOwner = parseInt(balanceOfOwner, 10)
                const tokenIds = await Promise.all(new Array(balanceOfOwner)
                    .fill()
                    .map((_, index) => platziPunks.methods.tokenOfOwnerByIndex(owner, index).call())
                )

                punks = await Promise.all(tokenIds.map(tokenId => getPunkData({ platziPunks, tokenId })))
            } else {
                let totalSupply = await platziPunks.methods.totalSupply().call()
                totalSupply = parseInt(totalSupply, 10)
                punks = await Promise.all(new Array(totalSupply)
                    .fill()
                    .map((_, index) => index)
                    .map(tokenId => getPunkData({ platziPunks, tokenId }))
                )
            }

            setPunks(punks)
            isLoading(false)
        }
    }, [platziPunks, owner, library])

    useEffect(() => { update() }, [update])

    return {
        punks,
        loading,
        update,
    }
}

export const usePlatziPunkData = tokenId => {
    const [punk, setPunk] = useState([])
    const [loading, isLoading] = useState(true)
    const platziPunks = usePlatziPunks()

    const update = useCallback(async () => {
        if (platziPunks && (tokenId || tokenId == 0)) {
            isLoading(true)
            const singlePunk = await getPunkData({ platziPunks, tokenId })

            setPunk(singlePunk)
            isLoading(false)
        }
    }, [platziPunks])

    useEffect(() => { update() }, [update])

    return {
        punk,
        loading,
        update,
    }
}
