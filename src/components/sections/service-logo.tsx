import Image from "next/image";
import { cn } from "@/lib/cn";
import { serviceLogos, type ServiceId } from "@/lib/studios";

/** Sub-brand names as written on the logos (not translated). */
export const serviceNames: Record<ServiceId, string> = {
  creative: "Pixel Creative",
  photo: "Pixel Photo Lab",
  dev: "Pixel Dev",
  events: "Pixel Events",
  sounds: "Pixel Sounds",
  enseigne: "Pixel Enseigne",
  tapini: "Tapini",
};

/** The sub-brand logo from the mobile app; Tapini has none yet, so its name is set in its colour. */
export function ServiceLogo({
  service,
  className,
  priority,
}: {
  service: ServiceId;
  className?: string;
  priority?: boolean;
}) {
  const logo = serviceLogos[service];
  if (!logo) {
    return (
      <span
        className={cn(
          "text-[2rem] leading-none font-extrabold tracking-[-0.03em] text-tapini [font-stretch:112%]",
          className,
        )}
      >
        {serviceNames[service]}
      </span>
    );
  }
  return (
    <Image
      src={logo}
      alt={serviceNames[service]}
      priority={priority}
      className={cn("h-14 w-auto", className)}
    />
  );
}
