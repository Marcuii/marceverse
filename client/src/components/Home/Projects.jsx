/**
 * @file Projects.jsx
 * @description Portfolio projects grid with category filtering.
 *
 * Fetches projects from the API, groups them by category, and renders
 * them as Material Tailwind cards with hover overlays.  Includes
 * animated tab switching using `framer-motion`.
 */

import { useEffect, useState, useMemo } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Chip,
  Menu,
  Checkbox,
  IconButton,
} from "@material-tailwind/react";
import { FaFilter, FaGithub, FaLink } from "react-icons/fa";
import { NavArrowRight, NavArrowLeft } from "iconoir-react";

import { API_BASE_URL } from "../../config/api";

export default function ProjectsSection() {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [projectsData, setProjectsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Fetch projects data
  useEffect(() => {
    fetch(`${API_BASE_URL}/projects`)
      .then((res) => res.json())
      .then((data) => setProjectsData(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  // Dynamically extract categories and tags
  const filteredData = useMemo(() => {
    const map = {};
    projectsData.forEach((project) => {
      const cat = project.category || "Other";
      if (!map[cat]) {
        map[cat] = new Set();
      }
      project.tags.forEach((tag) => map[cat].add(tag));
    });
    return Object.entries(map).map(([category, tagsSet]) => ({
      category,
      tags: Array.from(tagsSet),
    }));
  }, [projectsData]);

  // Handle category change (Filter)
  const handleCategoryChange = (tag) => {
    setCurrentPage(1); // Reset to page 1 on filter change
    setSelectedCategories((prev) =>
      prev.includes(tag)
        ? prev.filter((c) => c !== tag)
        : [...prev, tag]
    );
  };

  // Filter projects based on selected tags
  const filteredProjects =
    selectedCategories.length === 0
      ? projectsData
      : projectsData.filter((project) =>
          selectedCategories.some((tag) => project.tags.includes(tag))
        );

  // Pagination Logic
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);

  const next = () => {
    if (currentPage === totalPages) return;
    setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

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
          <Menu.Content className="z-10 bg-primary/30 text-primary-content max-h-96 overflow-y-auto">
            {filteredData.map(({ category, tags }) => (
              <Menu placement="right-start" key={category}>
                <Menu.Trigger
                  as={Menu.Item}
                  className="flex items-center justify-between"
                >
                  {category} <NavArrowRight className="h-4 w-4 translate-x-1" />
                </Menu.Trigger>
                <Menu.Content className="z-10 max-h-64 overflow-y-auto">
                  {tags.map((tag) => (
                    <Menu.Item
                      key={tag}
                      as="label"
                      htmlFor={`tag-${tag}`}
                      closeOnClick={false}
                      className="flex items-center gap-2 cursor-pointer bg-secondary text-secondary-content px-4 py-2 rounded-full shadow hover:scale-105 transition"
                    >
                      <Checkbox
                        id={`tag-${tag}`}
                        className=""
                        checked={selectedCategories.includes(tag)}
                        onChange={() => handleCategoryChange(tag)}
                      >
                        <Checkbox.Indicator />
                      </Checkbox>
                      {tag}
                    </Menu.Item>
                  ))}
                </Menu.Content>
              </Menu>
            ))}
          </Menu.Content>
        </Menu>
        <h1 className="text-4xl font-bold mb-10 py-1 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          My Projects
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProjects.map((project, index) => (
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

        {totalPages > 1 && (
          <div className="flex items-center gap-4 mt-12">
            <button
              onClick={prev}
              disabled={currentPage === 1}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-primary text-primary hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <NavArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors ${
                    currentPage === i + 1
                      ? "bg-primary text-white"
                      : "text-neutral-content hover:bg-neutral-content/20"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={next}
              disabled={currentPage === totalPages}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-primary text-primary hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <NavArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
