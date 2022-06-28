import {
    Stack,
    Flex,
    Heading,
    Text,
    Button,
    Image,
    Badge,
    useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { usePlatziPunks } from "../hooks/usePlatziPunks";
import { useCallback, useEffect, useState } from "react";

const Home = () => {
    const [isMinting, setIsMinting] = useState(false);
    const [imageSrc, setImageSrc] = useState("");
    const [totalSupply, setTotalSupply] = useState(0);
    const [maxSupply, setMaxSupply] = useState(10000);
    const { active, account } = useWeb3React();
    const platziPunks = usePlatziPunks();
    const toast = useToast()

    const getPlatziPunksData = useCallback(async () => {
        if (platziPunks) {
            const totalSupply = await platziPunks.methods.totalSupply().call();
            setTotalSupply(parseInt(totalSupply, 10))
            const maxSupply = await platziPunks.methods.maxSupply().call();
            setMaxSupply(maxSupply)
            const dnaPreview = await platziPunks.methods
                .deterministricPseudoRandomDNA(totalSupply, account)
                .call();
            const image = await platziPunks.methods.imageByDNA(dnaPreview).call();
            setImageSrc(image);
        }
    }, [platziPunks, account]);

    useEffect(() => {
        getPlatziPunksData();
    }, [getPlatziPunksData]);

    const mint = () => {
        setIsMinting(true)
        platziPunks.methods
            .mint()
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
                    description: "New token minted",
                    status: 'success'
                })
                setIsMinting(false)
            })
            .on("error", error => {
                toast({
                    duration: 3000,
                    title: "Transaction failed",
                    description: error.message,
                    status: 'error'
                })

                setIsMinting(false)
            })
    }
    return (
        <Stack
            align={"center"}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 20, md: 28 }}
            direction={{ base: "column-reverse", md: "row" }}
        >
            <Stack flex={1} spacing={{ base: 5, md: 10 }}>
                <Heading
                    lineHeight={1.1}
                    fontWeight={600}
                    fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
                >
                    <Text
                        as={"span"}
                        position={"relative"}
                        _after={{
                            content: "''",
                            width: "full",
                            height: "30%",
                            position: "absolute",
                            bottom: 1,
                            left: 0,
                            bg: "blue.400",
                            zIndex: -1,
                        }}
                    >
                        A Platzi Punk
                    </Text>
                    <br />
                    <Text as={"span"} color={"blue.400"}>
                        never stops learning
                    </Text>
                </Heading>
                <Text color={"gray.500"}>
                    Platzi Punks is a random Avatar collection whose metadata
                    is stored on-chain. Each one has unique caracteristics and there
                    will ever be a max of {maxSupply}.
                </Text>
                <Text color={"blue.500"}>
                    Each Platzi Punk is generated from a random number based in the minter address,
                    you can use the previzualizer to see which one you will have if you
                    mint it right now.
                </Text>
                <Stack
                    spacing={{ base: 4, sm: 6 }}
                    direction={{ base: "column", sm: "row" }}
                >
                    <Button
                        rounded={"full"}
                        size={"lg"}
                        fontWeight={"normal"}
                        px={6}
                        colorScheme={"blue"}
                        bg={"blue.400"}
                        _hover={{ bg: "blue.500" }}
                        disabled={!platziPunks}
                        onClick={mint}
                        isLoading={isMinting}
                    >
                        Get your punk
                    </Button>
                    <Link to="/punks">
                        <Button rounded={"full"} size={"lg"} fontWeight={"normal"} px={6}>
                            Gallery
                        </Button>
                    </Link>
                </Stack>
            </Stack>
            <Flex
                flex={1}
                direction="column"
                justify={"center"}
                align={"center"}
                position={"relative"}
                w={"full"}
            >
                <Image src={active ? imageSrc : "https://avataaars.io/"} />
                {active ? (
                    <>
                        <Flex mt={2}>
                            <Badge>
                                Next ID:
                                <Badge ml={1} colorScheme="blue">
                                    {totalSupply + 1}
                                </Badge>
                            </Badge>
                            <Badge ml={2}>
                                Address:
                                <Badge ml={1} colorScheme="blue">
                                    0x0000...0000
                                </Badge>
                            </Badge>
                        </Flex>
                        <Button
                            onClick={getPlatziPunksData}
                            mt={4}
                            size="xs"
                            colorScheme="blue"
                        >
                            Update
                        </Button>
                    </>
                ) : (
                    <Badge mt={2}>Wallet disconnected</Badge>
                )}
            </Flex>
        </Stack>
    );
};

export default Home;