# IMPORTANTE -  Instruções para execução

Para rodar o BACK END em sua máquina, deve ter o Java SDK 20 instalado ou alterar a versão do Java no arquivo pom.xml, exemplo:

    <properties>
        <java.version>17</java.version>
    </properties> 
    
    
Para rodar o FRONT END em sua máquina, execute o comando
 - npm install 
 
em seguida, para iniciar o projeto execute

- npm start

# Sobre o projeto - premissas
Lista simples de lembretes feita em Springboot e React (com template typescript) você também pode acessar o protótipo do figma [aqui](https://www.figma.com/file/99hNlbkmhhCKIvDsplqYFY/Untitled?node-id=0-1&t=YPZXwfMf43hIjbDb-0)

#Decisões de projeto

Primeiramente, foi construída a API do backend utilizando a framework Springboot do Java. Após a conclusão da construção da API, foi criado o protótipo no figma
para melhor direcionamento em relação ao design e aparência do front-end. Seguindo o protótipo foram criados a tela e os componentes em React, utilizando de styled
components. Por fim, foi realizada a conexão do front-end com a API já criada e o commit do projeto final no github. 

