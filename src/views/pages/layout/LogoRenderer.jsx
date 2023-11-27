export default function LogoRenderer(props) {
  return <img src="/assets/img/logo.svg" alt={props.name} {...props} />;
}
