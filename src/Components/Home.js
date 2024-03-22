// dependencies
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import api from '../api';

// components
import CardPet from './CardPet.js';

const Home = () => {

  const [pets, setPets] = useState([]);

  useEffect(() => {
    // call api
    (async () => {
      try {
        const { data } = await api.get('/api/pets')
        setPets(data);
      } catch (error) {
        console.log('error', error.message);
      }
    })();

  }, []);

  if (!pets.length) {
    return (
      <motion.section className='home' initial={{ width: 0 }} animate={{ width: "auto", transition: { duration: 0.5 } }} exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}>
        <p>Nenhum amiguinho disponível! 😢</p>
      </motion.section >
    );
  } else {
    return (
      <motion.section className='home' initial={{ width: 0 }} animate={{ width: "auto", transition: { duration: 0.5 } }} exit={{ x: window.innerWidth, transition: { duration: 0.5 } }}>
        <p>Olá! <br /> Veja os amigos disponíveis para adoção!</p>
        <div className='cards'>
          {
            pets.map((pet, i) => (
              <CardPet
                age={pet.birthday}
                size={pet.size}
                behavior={pet.personality}
                city={pet.city}
                name={pet.name}
                img={pet.profilePictureUrl}
                key={i}
              />
            ))
          }
        </div>
      </motion.section >
    );
  }
};

export default Home;