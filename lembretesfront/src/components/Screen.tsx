import { useState, useEffect } from "react";
import styled, { createGlobalStyle, GlobalStyleComponent, DefaultTheme } from "styled-components";
import './Screen.css' // file apenas para importação de estilos fontes baixados
import image from './content/imagelembretes.png' //imagem decorativa


//estilos globais
const GlobalStyle: GlobalStyleComponent<{}, DefaultTheme> = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    }

`;

//div principal 
const Tela = styled.div`
display: flex;
align-items: center;
flex-direction: column;
width: 100vw;
height: 100%;
background-repeat: inherit`;

// estilização da imagem decorativa
const Image = styled.img`
  width: 90px;
  height:90px;
  margin: 10px;
`;

//edição do título
const Titulo = styled.h1`
font-family: 'Lalezar';
font-size: 36px;
font-weight: bolder;
color: #545254;
text-align: center;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
margin: 10px;`;

//edição do título
const Subtitulo = styled.h2`
font-family: 'Lalezar';
font-size: 24px;
font-weight: bold;
color: #545254;
text-align: center;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
margin: 10px;`;


//div container para os componentes de adicionar novo lembrete
const ContainerAdd = styled.div`
display: flex;
align-items: center;
flex-direction: column;
top: 80%;
padding: 5px;
margin: 5px;`;

//div container para os lembretes já existentes
const ContainerLembretes = styled.div`
display: flex;
flex-direction: column;
align-items: left;
`;
//div container para um lembrete
const ContainerLembrete = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 10px;
margin: 5px;
`;

//inputs de dados de tarefas novas
const Inputs = styled.input`
padding:10px;
margin: 10px;
width: 200px;
border: 1px transparent;
background: #F0F8FF;
box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
border-radius: 45px;
font-family: 'Roboto'
font-weight: 200px;
`;


//botão para adicionar novo lembrete
const Adicionar = styled.button`
border-radius: 45px;
box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
padding: 10px;
background-color: #545254;
color: #F0F8FF;
font-family: 'Lalezar';
font-weight: bolder;
border: 1px transparent;
margin: 5px;
&:hover {
    background-color: #5D9554;
  }
`;

//botão para deletar lembrete
const Deletar = styled.button`
border-radius: 50%;
width: 20px;
height: 20px;
border: 1px transparent;
background-color: #545254;
color: #F0F8FF;
box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
padding: 1px;
margin: 5px;
font-family: 'Lalezar';
font-weight: bolder;
&:hover {
    background-color: #940B19;
  }
`
//data dos lembretes
const DataLembrete = styled.h3`
font-family: 'Roboto';
font-size: 16px;
font-weight: 200px;
color: #545254;
text-align: center;
text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
margin: 10px;`;

//nome  dos lembretes
const NomeLembretes = styled.li`
    font-family: 'Roboto';
    font-size: 20px;
    font-weight: normal;
    color: #545254;
    margin:10px;
    display: flex;
    flex-direction: row;
`;

const Screen = () =>{
  interface Lembrete {
    id: number;
    nome: string;
    data: string;
  }
  
  const [lembretes, setLembretes] = useState<Lembrete[]>([]);
  const [nomeLembrete, setNomeLembrete] = useState("");
  const [dataLembrete, setDataLembrete] = useState("");

  useEffect(() => {
    async function fetchLembretes() {
      const response = await fetch('http://localhost:8080/lembretes');
      const data = await response.json();
      setLembretes(data);
    }
    fetchLembretes();
  }, []);

  const handleExcluirLembrete = async (id: number) => {
    // Fazer a requisição DELETE para a API
    await fetch(`http://localhost:8080/lembretes/${id}`, {
      method: "DELETE"
    });
  
    // Atualizar a lista de lembretes
    const novosLembretes = lembretes.filter((lembrete) => lembrete.id !== id);
    setLembretes(novosLembretes);
  };

  const handleAdicionarLembrete = () => {
    // Verificar se os campos estão preenchidos
    if (!nomeLembrete || !dataLembrete) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    // Verificar se a data é válida e está no futuro
    const now = new Date();
    const lembreteDate = new Date(dataLembrete);
    if (isNaN(lembreteDate.getTime()) || lembreteDate < now) {
      alert("Por favor, informe uma data válida no futuro");
      return;
    }

    // Criar um novo lembrete
    const novoLembrete = {
      id: lembretes.length + 1,
      nome: nomeLembrete,
      data: dataLembrete,
    };

    // Adicionar o novo lembrete à lista de lembretes
    setLembretes([...lembretes, novoLembrete]);
    setNomeLembrete("");
    setDataLembrete("");
  };

  // Agrupar os lembretes por data
  const lembretesPorData: { [key: string]: Lembrete[] } = {};
  lembretes.reduce((acc, lembrete) => {
    const data = lembrete.data.toString().substring(0, 10);
    if (!acc[data]) {
      acc[data] = [];
    }
    acc[data].push(lembrete);
    return acc;
  }, lembretesPorData);

  // Ordenar as datas de forma cronológica
  const datasOrdenadas = Object.keys(lembretesPorData).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  return (
    <>
      <GlobalStyle />
      <Tela>
        <Image src={image} />
        <Titulo> LISTA DE LEMBRETES </Titulo>
        <ContainerAdd>
          <Inputs
            type="text"
            placeholder="NOME DO LEMBRETE"
            value={nomeLembrete}
            onChange={(event) => setNomeLembrete(event.target.value)}
          />
          <Inputs
            type="date"
            placeholder="DATA DO LEMBRETE"
            value={dataLembrete}
            onChange={(event) => setDataLembrete(event.target.value)}
          />
          <Adicionar onClick={handleAdicionarLembrete}>ADICIONAR</Adicionar>
        </ContainerAdd>
  
        <Subtitulo> MEUS LEMBRETES</Subtitulo>
        
        {Object.keys(lembretesPorData).sort().map((data) => (
          <ContainerLembrete key={data}>
            <DataLembrete>{data}</DataLembrete>
            <ul>
              {lembretesPorData[data].map((lembrete) => (
                <NomeLembretes key={lembrete.id}>
                  {lembrete.nome}
                  <Deletar onClick={() => handleExcluirLembrete(lembrete.id)}>X</Deletar>
                </NomeLembretes>
              ))}
            </ul>
          </ContainerLembrete>
        ))}
  </Tela>
</>
);
}

export default Screen;