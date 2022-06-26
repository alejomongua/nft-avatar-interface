import { useCallback, useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import PlatziPunksArtifact from '../config/artifacts/PlatziPunks'
import { usePlatziPunks } from "./usePlatziPunks";

const getPunkData = async ({ platziPunks, tokenId }) => {
    const [
        tokenURI,
        tokenDNA,
        owner,
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
        platziPunks.methods.tokenURI(tokenId).call(),
        platziPunks.methods.tokenDNA(tokenId).call(),
        platziPunks.methods.ownerOf(tokenId).call(),
        platziPunks.methods.getAccessoriesType(tokenId).call(),
        platziPunks.methods.getClotheColor(tokenId).call(),
        platziPunks.methods.getClotheType(tokenId).call(),
        platziPunks.methods.getEyeType(tokenId).call(),
        platziPunks.methods.getEyeBrowType(tokenId).call(),
        platziPunks.methods.getFacialHairColor(tokenId).call(),
        platziPunks.methods.getFacialHairType(tokenId).call(),
        platziPunks.methods.getHairColor(tokenId).call(),
        platziPunks.methods.getHatColor(tokenId).call(),
        platziPunks.methods.getGraphicType(tokenId).call(),
        platziPunks.methods.getMouthType(tokenId).call(),
        platziPunks.methods.getSkinColor(tokenId).call(),
        platziPunks.methods.getTopType(tokenId).call(),
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

export const usePlatziPunksData = () => {
    const [punks, setPunks] = useState([])
    const [loading, isLoading] = useState(true)
    const platziPunks = usePlatziPunks()

    const update = useCallback(async () => {
        if (platziPunks) {
            isLoading(true)
            let totalSupply = await platziPunks.methods.totalSupply().call()
            totalSupply = parseInt(totalSupply, 10)
            const punks = await Promise.all(new Array(totalSupply)
                .fill()
                .map((_, index) => index)
                .map(tokenId => getPunkData({ platziPunks, tokenId }))
            )

            setPunks(punks)
            isLoading(false)
        }
    }, [platziPunks])

    useEffect(() => { update() }, [update])

    return {
        punks,
        loading,
        update,
    }
}
