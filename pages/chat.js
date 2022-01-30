import {
    Box,
    Text,
    TextField,
    Image,
    Button,
    Icon,
  } from "@skynexui/components";
  import React from "react";
  import { useRouter } from 'next/router';
  import appConfig from "../config.json";
  import { createClient } from "@supabase/supabase-js";
  import { ButtonSendSticker } from '../src/components/ButtonSendSticker';


    
  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzUwNTM1NiwiZXhwIjoxOTU5MDgxMzU2fQ.wGqFYGRsXzUcr9d07UOT_gE7GBMhYyd_pHnBZYz8qWM";
  const SUPABASE_URL = "https://ykydlyrxytyognveisny.supabase.co";
  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  
  function escutaMensagensEmTempoReal(adicionaMensagem){
        return supabaseClient
            .from('mensagens')
            .on('INSERT', ( respostaLive ) =>{
                adicionaMensagem(respostaLive.new);
            })
            .subscribe();
  }


  export default function ChatPage() {
    const roteamento = useRouter();  
    const usuarioLogado = roteamento.query.username;
    const [loading, setLoading] = React.useState(true);    
    const [mensagem, setMensagem] = React.useState("");
    const [listaDeMensagens, setListaDeMensagens] = React.useState([]);



  
    //Se o dado vem de um servidor externo ele sai do fluxo padrão, portanto, usa useEffect()
    React.useEffect(() => {
      supabaseClient
        .from("mensagens")
        .select("*")
        .order("id", { ascending: false })
        .then(({ data }) => {
          console.log("Dados da consulta:", data);
          setListaDeMensagens(data);
          setLoading(false);
        });

        escutaMensagensEmTempoReal((novaMensagem) =>{
            //handleNovaMensagem(novaMensagem);
            setListaDeMensagens((valorAtualDaLista) =>{
                return [
                    novaMensagem,
                    ...valorAtualDaLista,
                ]
            });
        });
    }, []);
  
    function handleNovaMensagem(novaMensagem) {
      const mensagem = {
        //id: listaDeMensagens.length + 1,
        de: usuarioLogado,
        texto: novaMensagem,
      };
  
      supabaseClient
        .from("mensagens")
        .insert([
            mensagem
        ])
        .then(({ data }) => {
          console.log("criando mensagem: ", data);
          //setListaDeMensagens([data[0], ...listaDeMensagens]);
        });

      setMensagem("");
    }
  
    function recarregarMensagens() {
      setListaDeMensagens(
        listaDeMensagens.filter(function (mensagem) {
          return !mensagem.delete;
        })
      );
    }
  
    return (
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: appConfig.theme.colors.primary[100],
          backgroundImage: "url(demon-slayer4.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
          color: appConfig.theme.colors.neutrals["000"],
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            borderRadius: "5px",
            //backgroundColor: appConfig.theme.colors.neutrals[700],
            backgroundColor: "rgba(0, 0, 0, 0.45)",
            height: "100%",
            maxWidth: "95%",
            maxHeight: "95vh",
            padding: "32px",
          }}
        >
          <Header />
          <Box
            styleSheet={{
              position: "relative",
              display: "flex",
              flex: 1,
              height: "80%",
              //backgroundColor: appConfig.theme.colors.neutrals[600],
              backgroundColor: "rgba(0, 0, 0, 0.20)",
              flexDirection: "column",
              borderRadius: "5px",
              padding: "16px",
            }}
          >
            {loading ? (
              <Box
                styleSheet={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  styleSheet={{
                    width: "700px",
                    height: "380px",
                    display: "cover",
                    marginRight: "8px",
                    marginBottom: "100px",
                  }}
                  src='inosuke.gif'
                />
  
              </Box>
            ) : (
            <MessageList
              mensagens={listaDeMensagens}
              recarregarMensagens={recarregarMensagens}
            />
            )}
  
            
            <Box
              as="form"
              styleSheet={{
                display: "flex",
                alignItems: "center",
              }}
            >
                       
              <TextField
                value={mensagem}
                onChange={(event) => {
                  const valor = event.target.value;
                  setMensagem(valor);
                }}
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault("");
                    //handleNovaMensagem(mensagem);
                    {
                      mensagem.length > 0
                        ? handleNovaMensagem(mensagem)
                        : alert("Preencha o campo para enviar!");
                    }
                  }
                }}
                placeholder="Insira sua mensagem aqui..."
                type="textarea"
                styleSheet={{
                  width: "100%",
                  border: "0",
                  resize: "none",
                  borderRadius: "5px",
                  padding: "6px 8px",
                  backgroundColor: appConfig.theme.colors.neutrals[800],
                  marginRight: "12px",
                  color: appConfig.theme.colors.neutrals[200],
                }}
              />
              <ButtonSendSticker 
                  onStickerClick={(sticker) =>{
                      console.log('Salva esse sticker no banco');
                      handleNovaMensagem(':sticker: ' + sticker);
              }}
              
              />
              <Button
                type="submit"
                label="Enviar"
                onClick={(event) => {
                  event.preventDefault();
                  {
                    mensagem.length > 0
                      ? handleNovaMensagem(mensagem)
                      : alert("Preencha o campo para enviar!");
                  }
                }}
                styleSheet={{
                  width: "5%",
                  borderRadius: "5px",
                  height: "75%",
                  marginBottom: "8px",
                }}
                buttonColors={{
                  contrastColor: appConfig.theme.colors.neutrals["000"],
                  mainColor: appConfig.theme.colors.primary["700"],
                  mainColorLight: appConfig.theme.colors.primary["999"],
                  mainColorStrong: appConfig.theme.colors.primary["900"],
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
  
  function Header() {
    return (
      <>
        <Box
          styleSheet={{
            width: "100%",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text variant="heading5">Vamos falar sobre DemonSlayer!</Text>
          <Button
            variant="primary"
            colorVariant="dark"
            label="Logout"
            href="/"
          />
        </Box>
      </>
    );
  }
  
  function MessageList(props) {
    console.log(props.listaDeMensagens);
    return (
      <Box
        tag="ul"
        styleSheet={{
          overflow: "scroll",
          display: "flex",
          flexDirection: "column-reverse",
          flex: 1,
          color: appConfig.theme.colors.neutrals["000"],
          marginBottom: "16px",
        }}
      >
        {props.mensagens.map((mensagem) => {
          return (
            <Text
              key={mensagem.id}
              tag="li"
              styleSheet={{
                borderRadius: "5px",
                padding: "6px",
                marginBottom: "12px",
                hover: {
                  backgroundColor: appConfig.theme.colors.neutrals[999],
                },
              }}
            >
              <Box
                styleSheet={{
                  marginBottom: "8px",
                }}
              >
                <Image
                  styleSheet={{
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    display: "inline-block",
                    marginRight: "8px",
                  }}
                  src={`https://github.com/${mensagem.de}.png`}
                />
                <Text tag="strong">{mensagem.de}</Text>
                <Text
                  styleSheet={{
                    fontSize: "10px",
                    marginLeft: "8px",
                    color: appConfig.theme.colors.neutrals[300],
                  }}
                  tag="span"
                >
                  {(new Date().toLocaleDateString())}
                </Text>
                <Icon
                  name={"FaTrash"}
                  styleSheet={{
                    marginLeft: "auto",
                    marginRight: ".7rem",
                    transition: ".4s ease all",
                    cursor: "pointer",
                    hover: {
                      color: appConfig.theme.colors.neutrals["000"],
                    },
                  }}
                  onClick={() => {
                    mensagem.delete = true;
                    props.recarregarMensagens();
                  }}
                />
              </Box>
              {/*Modo declarativo*/}
              {/*mensagem.texto.startsWith(':sticker:').toString()*/}
              {mensagem.texto.startsWith(':sticker:') 
              ? (
                  <Image src={mensagem.texto.replace(':sticker:','')} />
              )
              :(
                  mensagem.texto
              )}
              
            </Text>
          );
        })}
      </Box>
    );
  }
  