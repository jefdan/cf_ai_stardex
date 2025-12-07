import { X } from "@phosphor-icons/react";
import { Button } from "@/components/button/Button";
import { Card } from "@/components/card/Card";

interface CelestialObject {
  name: string;
  type: string;
  diameter?: string;
  mass?: string;
  distanceFromSun?: string;
  distanceFromEarth?: string;
  orbitalPeriod?: string;
  rotationPeriod?: string;
  moons?: number;
  atmosphere?: string;
  description?: string;
  surfaceTemperature?: string;
  coreTemperature?: string;
  age?: string;
  composition?: string;
  imageUrl?: string;
  rightAscension?: string;
  declination?: string;
  magnitude?: string;
  distance?: string;
}

interface CelestialInfoPanelProps {
  object: CelestialObject | null;
  onClose: () => void;
}

export const CelestialInfoPanel = ({
  object,
  onClose
}: CelestialInfoPanelProps) => {
  if (!object) return null;

  return (
    <div className="h-full flex flex-col bg-neutral-50 dark:bg-neutral-950 border-l border-neutral-300 dark:border-neutral-800">
      {/* Header */}
      <div className="px-4 py-3 border-b border-neutral-300 dark:border-neutral-800 flex items-center justify-between sticky top-0 z-10 bg-neutral-50 dark:bg-neutral-950">
        <h2 className="font-semibold text-base truncate">{object.name}</h2>
        <Button
          variant="ghost"
          size="md"
          shape="square"
          className="rounded-full h-8 w-8 flex-shrink-0"
          onClick={onClose}
        >
          <X size={18} />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-8">
        {/* Image */}
        {object.imageUrl && (
          <div className="w-full aspect-square rounded-lg overflow-hidden bg-neutral-900">
            <img
              src={object.imageUrl}
              alt={object.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Hide image if it fails to load
                e.currentTarget.style.display = "none";
              }}
            />
          </div>
        )}

        {/* Type */}
        <Card className="p-3 bg-neutral-100 dark:bg-neutral-900">
          <div className="text-xs text-muted-foreground mb-1">Type</div>
          <div className="text-sm font-medium">{object.type}</div>
        </Card>

        {/* Description */}
        {object.description && (
          <Card className="p-3 bg-neutral-100 dark:bg-neutral-900">
            <div className="text-xs text-muted-foreground mb-1">
              Description
            </div>
            <div className="text-sm">{object.description}</div>
          </Card>
        )}

        {/* Physical Properties */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
            Physical Properties
          </h3>

          {object.diameter && (
            <Card className="p-3 bg-neutral-100 dark:bg-neutral-900">
              <div className="text-xs text-muted-foreground mb-1">Diameter</div>
              <div className="text-sm font-medium">{object.diameter}</div>
            </Card>
          )}

          {object.mass && (
            <Card className="p-3 bg-neutral-100 dark:bg-neutral-900">
              <div className="text-xs text-muted-foreground mb-1">Mass</div>
              <div className="text-sm font-medium">{object.mass}</div>
            </Card>
          )}

          {object.composition && (
            <Card className="p-3 bg-neutral-100 dark:bg-neutral-900">
              <div className="text-xs text-muted-foreground mb-1">
                Composition
              </div>
              <div className="text-sm font-medium">{object.composition}</div>
            </Card>
          )}

          {object.atmosphere && (
            <Card className="p-3 bg-neutral-100 dark:bg-neutral-900">
              <div className="text-xs text-muted-foreground mb-1">
                Atmosphere
              </div>
              <div className="text-sm font-medium">{object.atmosphere}</div>
            </Card>
          )}
        </div>

        {/* Orbital Properties */}
        {(object.distanceFromSun ||
          object.distanceFromEarth ||
          object.orbitalPeriod ||
          object.rotationPeriod) && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Orbital Properties
            </h3>

            {object.distanceFromSun && (
              <Card className="p-3 bg-neutral-100 dark:bg-neutral-900">
                <div className="text-xs text-muted-foreground mb-1">
                  Distance from Sun
                </div>
                <div className="text-sm font-medium">
                  {object.distanceFromSun}
                </div>
              </Card>
            )}

            {object.distanceFromEarth && (
              <Card className="p-3 bg-neutral-100 dark:bg-neutral-900">
                <div className="text-xs text-muted-foreground mb-1">
                  Distance from Earth
                </div>
                <div className="text-sm font-medium">
                  {object.distanceFromEarth}
                </div>
              </Card>
            )}

            {object.orbitalPeriod && (
              <Card className="p-3 bg-neutral-100 dark:bg-neutral-900">
                <div className="text-xs text-muted-foreground mb-1">
                  Orbital Period
                </div>
                <div className="text-sm font-medium">
                  {object.orbitalPeriod}
                </div>
              </Card>
            )}

            {object.rotationPeriod && (
              <Card className="p-3 bg-neutral-100 dark:bg-neutral-900">
                <div className="text-xs text-muted-foreground mb-1">
                  Rotation Period
                </div>
                <div className="text-sm font-medium">
                  {object.rotationPeriod}
                </div>
              </Card>
            )}

            {object.moons !== undefined && (
              <Card className="p-3 bg-neutral-100 dark:bg-neutral-900">
                <div className="text-xs text-muted-foreground mb-1">Moons</div>
                <div className="text-sm font-medium">{object.moons}</div>
              </Card>
            )}
          </div>
        )}

        {/* Temperature */}
        {(object.surfaceTemperature || object.coreTemperature) && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Temperature
            </h3>

            {object.surfaceTemperature && (
              <Card className="p-3 bg-neutral-100 dark:bg-neutral-900">
                <div className="text-xs text-muted-foreground mb-1">
                  Surface Temperature
                </div>
                <div className="text-sm font-medium">
                  {object.surfaceTemperature}
                </div>
              </Card>
            )}

            {object.coreTemperature && (
              <Card className="p-3 bg-neutral-100 dark:bg-neutral-900">
                <div className="text-xs text-muted-foreground mb-1">
                  Core Temperature
                </div>
                <div className="text-sm font-medium">
                  {object.coreTemperature}
                </div>
              </Card>
            )}
          </div>
        )}

        {/* Astronomical Coordinates */}
        {(object.rightAscension ||
          object.declination ||
          object.magnitude ||
          object.distance) && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
              Astronomical Data
            </h3>

            {object.rightAscension && (
              <Card className="p-3 bg-neutral-100 dark:bg-neutral-900">
                <div className="text-xs text-muted-foreground mb-1">
                  Right Ascension (RA)
                </div>
                <div className="text-sm font-medium">
                  {object.rightAscension}
                </div>
              </Card>
            )}

            {object.declination && (
              <Card className="p-3 bg-neutral-100 dark:bg-neutral-900">
                <div className="text-xs text-muted-foreground mb-1">
                  Declination (Dec)
                </div>
                <div className="text-sm font-medium">{object.declination}</div>
              </Card>
            )}

            {object.magnitude && (
              <Card className="p-3 bg-neutral-100 dark:bg-neutral-900">
                <div className="text-xs text-muted-foreground mb-1">
                  Magnitude
                </div>
                <div className="text-sm font-medium">{object.magnitude}</div>
              </Card>
            )}

            {object.distance && (
              <Card className="p-3 bg-neutral-100 dark:bg-neutral-900">
                <div className="text-xs text-muted-foreground mb-1">
                  Distance
                </div>
                <div className="text-sm font-medium">{object.distance}</div>
              </Card>
            )}
          </div>
        )}

        {/* Age */}
        {object.age && (
          <Card className="p-3 bg-neutral-100 dark:bg-neutral-900">
            <div className="text-xs text-muted-foreground mb-1">Age</div>
            <div className="text-sm font-medium">{object.age}</div>
          </Card>
        )}
      </div>
    </div>
  );
};
