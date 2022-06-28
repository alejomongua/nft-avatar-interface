const About = () => (
    <>
        <div className="container mx-auto">
            <h1 className="text-4xl font-bold my-8">
                About this project
            </h1>
            <p className="my-2">
                This is an NTF gallery project based on a Platzi Course:
                <a className="mx-1 text-blue-500 underline" href="https://platzi.com/cursos/frontend-dapps/" target="_blank">
                    Curso de Desarrollo Frontend de Aplicaciones Descentralizadas con Web3.Js
                </a>
                by
                <a className="mx-1 text-blue-500 underline" href="https://github.com/ernestognw" target="_blank">
                    Ernesto García
                </a>
            </p>

            <p className="my-2">
                It was programed by
                <a className="mx-1 text-blue-500 underline" href="https://github.com/alejomongua">
                    Alejandro Mongua
                </a>
                in 2022. The source code of this app can be found in
                <a className="mx-1 text-blue-500 underline" href="https://github.com/alejomongua/nft-avatar-interface">
                    this github repo
                </a>
            </p>

            <p className="my-2">
                Its backend comes also from another Platzi Course
                <a className="mx-1 text-blue-500 underline" href="https://platzi.com/cursos/intro-dapps/" target="_blank">
                    Curso de Dapps: Introducción al Desarrollo de Aplicaciones Descentralizadas
                </a>
                also by
                <a className="mx-1 text-blue-500 underline" href="https://github.com/ernestognw" target="_blank">
                    Ernesto García
                </a>.
                It is deployed in the Rinkeby testnet and its source code can be found in
                <a className="mx-1 text-blue-500 underline" href="https://github.com/alejomongua/nft-avatars">
                    this github repo
                </a>
            </p>


        </div>
    </>
)

export default About