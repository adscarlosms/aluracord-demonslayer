import appConfig from '../config.json';
import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import { useRouter } from 'next/router';



function Titulo(props){
    const Tag = props.tag || 'h1'; 
    return(
        <>
            <Tag>{props.children}</Tag>
            <style jsx>{`
                ${Tag} {
                    color: ${appConfig.theme.colors.neutrals['200']};
                    font-size: 24px;
                    font-weight: 600;
                }

                
            `}
            </style>
        </>
    );
}


//componente react
/* function HomePage() {
    return (
        <div>
            <GlobalStyle />
            <Titulo tag="h2">Boas vindas de volta!</Titulo>
            <h2>Discord - Alura Matrix</h2>
        </div>
    );
} */
  
 // export default HomePage

 export default function PaginaInicial() {
    //const username = 'adscarlosms';
    const [username, setUsername] = React.useState('adscarlosms');
    const roteamento = useRouter();
  
    return (
      <>
        {/* 
        Foi tirado o <GlobalStyle /> porque o arquivo _app.js contém ele e é um arquivo global */}
        <Box
          styleSheet={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backgroundColor: appConfig.theme.colors.primary[100],
            backgroundImage: 'url(demon-slayer3.jpg)',
            backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
          }}
        >
          <Box
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
              width: '100%', maxWidth: '700px',
              borderRadius: '5px', padding: '32px', margin: '16px',
              boxShadow: '0 2px 10px 0 rgb(0 0 0 / 30%)',
              //backgroundColor: appConfig.theme.colors.neutrals[700],  
              backgroundColor: "rgba(0, 0, 0, 0.65)",            
            }}
          >
            {/* Formulário */}
            <Box
              as="form"
              onSubmit = {function (infosDoEvento){
                infosDoEvento.preventDefault();  
                //Para usar o recurso de roteamento do Next
                roteamento.push(`/chat?username=${username}`);
              }}
              styleSheet={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
              }}
            >
              <Titulo tag="h2">Kimetsu no Yaiba</Titulo>
              <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[200] }}>
                {appConfig.name}
              </Text>
  
            {/*  <input 
                type="text"
                value={username}
                onChange={function (event){
                    console.log('usuario digitou', event.target.value);
                    //Onde está o valor ?
                    const valor = event.target.value;
                    //Trocar o valor do value
                    setUsername(valor);
                }} 
             />   */}     
             {<TextField
                value={username}
                onChange={function (event){
                   
                    console.log('usuario digitou', event.target.value);
                    //Onde está o valor ?
                    const valor = event.target.value;
                    //Trocar o valor do value
                    setUsername(valor);                       
              

                }}
                placeholder="Digite o usuário do GitHub"
                fullWidth
                textFieldColors={{
                  neutral: {
                    textColor:  appConfig.theme.colors.neutrals["000"],
                    mainColor: appConfig.theme.colors.primary["800"],
                    mainColorHighlight: appConfig.theme.colors.primary["900"],
                    backgroundColor: appConfig.theme.colors.primary["800"],
                  },
                }}
              />}
              <Button
                type='submit'
                label='Entrar'
                fullWidth
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary["700"],
                  mainColorLight: appConfig.theme.colors.primary["999"],
                  mainColorStrong: appConfig.theme.colors.primary["900"],
                }}
              />
            </Box>
            {/* Formulário */}
  
  
            {/* Photo Area */}
            <Box
              styleSheet={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                maxWidth: '200px',
                padding: '16px',
                backgroundColor: "rgba(0, 0, 0, 0.65)",
                border: '1px solid',
                borderColor: appConfig.theme.colors.neutrals[999],
                borderRadius: '10px',
                flex: 1,
                minHeight: '240px',
              }}
            >
              <Image
                styleSheet={{
                  borderRadius: '50%',
                  marginBottom: '16px',
                }}

                src={
                    username.length > 2
                    ? `https://github.com/${username}.png`
                    : `imgerro.png`
                }
              />
              <Text
                variant="body4"
                styleSheet={{
                  color: appConfig.theme.colors.neutrals[200],
                  backgroundColor: appConfig.theme.colors.neutrals[900],
                  padding: '3px 10px',
                  borderRadius: '1000px'
                }}
              >
                {username}
              </Text>
            </Box>
            {/* Photo Area */}
          </Box>
        </Box>
      </>
    );
  }