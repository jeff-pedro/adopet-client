// styles
import Button from "./Button";

// dependencies
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";

// api
import api from "../api";

// contexts
import { AuthContext } from "../contexts/auth";

const Message = () => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const location = useLocation();

  // destructuring useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onSubmit = async (data) => {
    // FEATURE: implementar envio de email para o Adopet
    if (location.pathname === "/mensagem") {
      console.log(data);
      alert("Mensagem enviada com sucesso!");
    } else {
      // call api
      try {
        await api.put(`/api/tutors/${userData.id}`, data);

        alert("Perfil alterado com sucesso!");

        navigate("/home");
      } catch (error) {
        console.log("Error:", error);
      }
    }
  };

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    if (location.pathname === "/perfil") {
      (async () => {
        try {
          const { id } = user;
          const { data } = await api.get(`api/tutors/${id}`);

          setUserData(data);

          // console.log("Success:", data);
        } catch (err) {
          console.log("Error:", err);
        }
      })();
    }
  }, [user, location]);

  return (
    <motion.section
      className="message"
      initial={{ width: 0 }}
      animate={{ width: "auto", transition: { duration: 0.5 } }}
      exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}
    >
      {location.pathname === "/mensagem" ? (
        <>
          <p>
            Envie uma mensagem para a pessoa ou instituição que está cuidado do
            animal:
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              data-test="name"
              {...register("name", {
                required: "É necessário informar seu nome",
                maxLength: {
                  value: 40,
                  message: "O número máximo de caracteres é 40",
                },
              })}
              placeholder="Insira seu nome completo"
            />
            {errors.name && <p className="error">{errors.name.message}</p>}

            <label htmlFor="phone">Telefone</label>
            <input
              type="tel"
              id="phone"
              data-test="phone"
              {...register("phone", {
                required: "Informe um número de telefone",
                pattern: /\(?[1-9]{2}\)?\s?9?[0-9]{8}/,
              })}
              placeholder="Insira seu telefone e/ou whatsapp"
            />
            {errors.phone && (
              <p className="error">
                {errors.phone.message ||
                  "Por favor, verifique o número digitado"}
              </p>
            )}

            <label htmlFor="petName">Nome do animal</label>
            <input
              id="petName"
              type="text"
              data-test="petName"
              {...register("petName", {
                required: "É necessário informar o nome do animal",
                maxLength: {
                  value: 25,
                  message: "O número máximo de caracteres é 25",
                },
              })}
              placeholder="Por qual animal você se interessou?"
            />
            {errors.petName && (
              <p className="error">{errors.petName.message}</p>
            )}

            <label htmlFor="msg">Mensagem</label>
            <textarea
              name="msg"
              id="msg"
              cols="30"
              rows="10"
              data-test="message"
              {...register("msg", {
                required: "É necessário escrever uma mensagem",
                maxLength: {
                  value: 500,
                  message: "O número máximo de caracteres é 500",
                },
              })}
              placeholder="Escreva sua mensagem."
              spellCheck="false"
            />
            {errors.msg && <p className="error">{errors.msg.message}</p>}

            <Button type="submit" children="Enviar" data-test="btn-message" />
          </form>
        </>
      ) : (
        <>
          <p>
            Esse é o perfil que aparece para responsáveis ou ONGs que recebem
            sua mensagem.
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <legend>Perfil</legend>
            <label htmlFor="user-pic">Foto</label>
            <input
              type="image"
              id="userPic"
              data-test="photo"
              src={userData.profilePictureUrl}
              alt="Usuário logado"
            />
            <a href="#">Clique na foto para editar</a>

            <label htmlFor="name">Nome</label>
            <input
              id="name"
              type="text"
              data-test="name"
              {...register("name", {
                required: "É necessário informar seu nome",
                maxLength: {
                  value: 40,
                  message: "O número máximo de caracteres é 40",
                },
              })}
              placeholder="Insira seu nome completo"
              defaultValue={userData.name}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}

            <label htmlFor="phone">Telefone</label>
            <input
              type="tel"
              id="phone"
              data-test="phone"
              {...register("phone", {
                required: "Informe um número de telefone",
                pattern: /\(?[1-9]{2}\)?\s?9?[0-9]{8}/,
              })}
              placeholder="Insira seu telefone e/ou whatsapp"
              defaultValue={userData.phone}
            />
            {errors.phone && (
              <p className="error">
                {errors.phone.message ||
                  "Por favor, verifique o número digitado"}
              </p>
            )}

            <label htmlFor="city">Cidade</label>
            <input
              type="text"
              id="city"
              data-test="city"
              {...register("city", {
                required: "Informe a cidade em que você mora",
              })}
              placeholder="Informe a cidade em que você mora"
              defaultValue={userData.city}
            />

            <label htmlFor="about">Sobre</label>
            <textarea
              spellCheck="false"
              name="about"
              id="about"
              data-test="about"
              {...register("about")}
              cols="30"
              rows="8"
              placeholder="Escreva sua mensagem."
              defaultValue={userData.about}
            />

            <Button type="submit" children="Salvar" dataTest="btn-profile" />
          </form>
        </>
      )}
    </motion.section>
  );
};

export default Message;
