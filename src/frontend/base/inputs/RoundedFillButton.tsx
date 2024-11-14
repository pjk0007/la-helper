export default function RoundedFillButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      className="inputs--button inputs--button--rounded inputs--button--fill"
      {...props}
    />
  );
}
