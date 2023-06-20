import { Helmet } from "react-helmet-async";

const RouteTitle = ({ title }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title} - ARITCIO</title>
    </Helmet>
  );
};

export default RouteTitle;
