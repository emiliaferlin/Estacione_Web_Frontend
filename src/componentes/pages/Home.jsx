const Home = () => (
    <>
      <div className="view">
       <h1>Seja Bem Vindo ao Estacionamento</h1>
       ${process.env.REACT_APP_ENDERECO_API}
      </div>
    </>
  );

export default Home;