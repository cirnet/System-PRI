import error_404 from "../Img/404.PNG";
const style = {
  display: "flex",
  justifyContent: "center",
};
export default function Error404() {
  return (
    <div style={style}>
      <img src={error_404} alt="error 404" />
    </div>
  );
}
