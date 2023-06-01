import classNames from "@calcom/lib/classNames";
import { LOGO } from "@calcom/lib/constants";

export default function Logo({
  small,
  icon,
  inline = true,
  className,
}: {
  small?: boolean;
  icon?: boolean;
  inline?: boolean;
  className?: string;
}) {
  return (
    <h3 className={classNames("logo", inline && "inline", className)}>
      <strong>
        {icon ? (
          <img className="mx-auto w-9 dark:invert" alt="Cal" title="Cal" src="/api/logo?type=icon" />
        ) : (
          <img className={small ? "h-8 w-auto" : "h-12 w-auto"} alt="Cal" title="Cal" src={LOGO} />
        )}
      </strong>
    </h3>
  );
}
