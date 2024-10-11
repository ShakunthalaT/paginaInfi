const Home = (props) => {
  const { homeDetails } = props;
  const { title, imageUrl } = homeDetails;
  return (
    <li>
      <p>{title}</p>
      <p>{imageUrl}</p>
    </li>
  );
};

export default Home;
