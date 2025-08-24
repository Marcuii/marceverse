import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Chip,
  Menu,
  Checkbox,
} from "@material-tailwind/react";
import { FaFilter, FaGithub, FaLink } from "react-icons/fa";
import { NavArrowRight } from "iconoir-react";

export default function ProjectsSection() {
  const frontCategories = ["JS", "React", "Context API", "TailwindCSS", "API"];
  const backCategories = ["NodeJS", "ExpressJS", "MongoDB"];
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [projectsData, setProjectsData] = useState([]);

  // Fetch projects data
  useEffect(() => {
    fetch("/data/projects.json")
      .then((res) => res.json())
      .then((data) => setProjectsData(data));
  }, []);

  // Handle category change (Filter)
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // Filter projects based on selected categories
  const filteredProjects =
    selectedCategories.length === 0
      ? projectsData
      : projectsData.filter((project) =>
          selectedCategories.every((cat) => project.tags.includes(cat))
        );

  return (
    <section id="projects" className="w-full flex justify-center py-20">
      <div className="w-11/12 lg:w-9/12 rounded-2xl p-8 border-4 border-primary flex flex-col items-center bg-base-100/30 backdrop-blur relative">
        <Menu placement="left-start">
          <Menu.Trigger
            as={Button}
            className="!absolute top-1 right-1 sm:top-9 sm:right-7 bg-neutral text-neutral-content"
          >
            <FaFilter className="mr-2" />
            Filter
          </Menu.Trigger>
          <Menu.Content className="z-10 bg-primary/30 text-primary-content">
            <Menu placement="top-end">
              <Menu.Trigger
                as={Menu.Item}
                className="flex items-center justify-between"
              >
                FrontEnd <NavArrowRight className="h-4 w-4 translate-x-1" />
              </Menu.Trigger>
              <Menu.Content className="z-10">
                {frontCategories.map((cat) => (
                  <Menu.Item
                    key={cat}
                    as="label"
                    htmlFor={`category-${cat}`}
                    closeOnClick={false}
                    className="flex items-center gap-2 cursor-pointer bg-secondary text-secondary-content px-4 py-2 rounded-full shadow hover:scale-105 transition"
                  >
                    <Checkbox
                      id={`category-${cat}`}
                      className=""
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryChange(cat)}
                    >
                      <Checkbox.Indicator />
                    </Checkbox>
                    {cat}
                  </Menu.Item>
                ))}
              </Menu.Content>
            </Menu>
            <Menu placement="bottom-end">
              <Menu.Trigger
                as={Menu.Item}
                className="flex items-center justify-between"
              >
                BackEnd <NavArrowRight className="h-4 w-4 translate-x-1" />
              </Menu.Trigger>
              <Menu.Content className="z-10">
                {backCategories.map((cat) => (
                  <Menu.Item
                    key={cat}
                    as="label"
                    htmlFor={`category-${cat}`}
                    className="flex items-center gap-2 cursor-pointer bg-secondary text-secondary-content px-4 py-2 rounded-full shadow hover:scale-105 transition"
                    closeOnClick={false}
                  >
                    <Checkbox
                      id={`category-${cat}`}
                      className=""
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryChange(cat)}
                    >
                      <Checkbox.Indicator />
                    </Checkbox>
                    {cat}
                  </Menu.Item>
                ))}
              </Menu.Content>
            </Menu>
          </Menu.Content>
        </Menu>
        <h1 className="text-4xl font-bold mb-10 py-1 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          My Projects
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card
              key={index}
              className="group bg-gradient-to-b from-primary to-secondary border border-neutral rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
            >
              <CardBody className="p-0">
                <div className="w-full h-44 lg:h-56 overflow-hidden rounded-lg">
                  <img
                    src={project.image}
                    alt={project.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <Typography className="text-xl font-bold text-neutral mb-2">
                  {project.name}
                </Typography>
                <Typography className="text-sm text-neutral/80 mb-4">
                  {project.description}
                </Typography>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      value={tag}
                      className="bg-primary text-primary-content text-xs px-3 py-1 rounded-full shadow"
                    >
                      {tag}
                    </Chip>
                  ))}
                </div>
                </div>
              </CardBody>
              <CardFooter className="flex gap-3 mt-2">
                <Button
                  color="blue"
                  size="sm"
                  className="flex items-center gap-2 rounded-full bg-base-100 hover:bg-base-100/10 text-secondary hover:text-secondary-content"
                  onClick={() => window.open(project.repo, "_blank")}
                >
                  <FaGithub size={16} /> Repo
                </Button>
                {project.demo && (
                  <Button
                    className="flex items-center gap-2 rounded-full bg-primary hover:bg-primary/10 text-primary-content"
                    onClick={() => window.open(project.demo, "_blank")}
                  >
                    <FaLink size={16} /> Live
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
