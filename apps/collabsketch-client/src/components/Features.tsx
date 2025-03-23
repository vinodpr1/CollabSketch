import {
  CheckSquare,
  RefreshCw,
  TrendingUp,
  Users,
  Bookmark,
  Calendar,
  MousePointer2,
  MousePointer,
  Scaling,
} from "lucide-react";

const features = [
  {
    id: 1,
    icon: <MousePointer2 size={"1.2rem"} />,
    title: "Shape Manipulation",
    description: "Users can move, rotate, and transform shapes in real-time.",
  },
  {
    id: 2,
    icon: <RefreshCw size={"1.2rem"} />,
    title: "Stroke & Fill Customization",
    description:
      "Users can adjust stroke size, color, opacity, and fill styles for shapes.",
  },
  {
    id: 3,
    icon: <TrendingUp size={"1.2rem"} />,
    title: "Canvas & Interaction Features",
    description:
      "Includes zoom, pan, grid snapping, and multi-selection for better control.",
  },
  {
    id: 4,
    icon: <MousePointer size={"1.2rem"} />,
    title: "Replace Shape",
    description:
      "Users can replace existing shapes with different ones while retaining properties.",
  },
  {
    id: 5,
    icon: <Scaling size={"1.2rem"} />,
    title: "Resize Shape",
    description:
      "Allows resizing shapes dynamically with drag handles or input controls.",
  },
  {
    id: 7,
    icon: <Users size={"1.2rem"} />,
    title: "Real-Time Collaboration",
    description:
      "Multiple users can edit the canvas simultaneously with live updates.",
  },
];

const Features = () => {
  return (
    <section className="px-6 py-8 border-gray-300">
      <div className="flex gap-6 items-center mx-auto max-w-6xl w-full">
        <div className="justify-between gap-8 flex flex-wrap">
          {features.map((feature) => {
            return (
              <div
                key={feature.id}
                className="bg-neutral-300 shadow-xl p-[1rem] border rounded-md w-[320px] transition-all duration-700 hover:translate-y-2"
              >
                <div className="gap-2 flex items-center mb-[.5rem]">
                  <i className="text-[1.2rem] text-gray-800">{feature.icon}</i>
                  <h3 className="text-[1.2rem] text-gray-800 font-semibold">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-[.9rem] text-gray-800">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
