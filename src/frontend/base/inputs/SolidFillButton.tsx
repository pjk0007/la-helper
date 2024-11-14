export default function SolidFillButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      className="inputs--button inputs--button--solid inputs--button--fill"
      {...props}
    />
  );
}
