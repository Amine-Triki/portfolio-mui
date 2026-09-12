import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogContent,
  IconButton,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import CloseIcon from "@mui/icons-material/Close";
import Heading from "../../components/Heading";

const externalLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
};

const ProjectCard = ({ project, onOpenScreenshots }) => (
  <Card
    sx={{
      height: "100%",
      width: "100%",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <CardMedia
      component="img"
      image={project.imageSrc}
      alt={project.title}
      sx={{
        height: { xs: 190, sm: 220 },
        objectFit: "cover",
      }}
    />
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography variant="h6" color="primary" gutterBottom>
        {project.title}
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        {project.description}
      </Typography>
      {!project.variants && project.technologies?.length > 0 && (
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {project.technologies.map((technology) => (
            <Chip key={technology} label={technology} size="small" color="primary" variant="outlined" />
          ))}
        </Box>
      )}
      {project.variants?.length > 0 && (
        <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap", alignItems: "center" }}>
          {project.variants.map((variant) => (
            <Box key={variant.stack} sx={{ display: "flex", alignItems: "center" }}>
              <Chip
                label={variant.stack}
                component="a"
                href={variant.link}
                clickable
                color="primary"
                size="small"
                {...externalLinkProps}
              />
              {variant.github && (
                <IconButton
                  component="a"
                  href={variant.github}
                  size="small"
                  aria-label={`${variant.stack} GitHub repository`}
                  {...externalLinkProps}
                >
                  <GitHubIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          ))}
        </Box>
      )}
    </CardContent>
    <CardActions sx={{ gap: 1, flexWrap: "wrap", px: 2, pb: 2 }}>
      {!project.variants && project.link && (
        <Button variant="contained" href={project.link} {...externalLinkProps}>
          Live Preview
        </Button>
      )}
      {!project.variants && project.github && (
        <Button variant="outlined" href={project.github} {...externalLinkProps}>
          GitHub
        </Button>
      )}
      {!project.variants && project.screenshots?.length > 0 && (
        <Button variant="outlined" onClick={() => onOpenScreenshots(project.screenshots)}>
          View Screenshots
        </Button>
      )}
    </CardActions>
  </Card>
);

const ScreenshotDialog = ({ screenshots, onClose }) => {
  const [activeScreenshot, setActiveScreenshot] = useState(screenshots[0]);

  useEffect(() => {
    setActiveScreenshot(screenshots[0]);
  }, [screenshots]);

  return (
    <Dialog open={screenshots.length > 0} onClose={onClose} maxWidth="md" fullWidth>
      <IconButton
        onClick={onClose}
        aria-label="Close screenshots"
        sx={{ position: "absolute", right: 8, top: 8, zIndex: 1 }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        <Box
          component="img"
          src={activeScreenshot}
          alt="Project screenshot"
          sx={{ display: "block", width: "100%", maxHeight: "65vh", objectFit: "contain", mb: 2 }}
        />
        <Box sx={{ display: "flex", gap: 1, overflowX: "auto", pb: 1 }}>
          {screenshots.map((screenshot) => (
            <Box
              key={screenshot}
              component="img"
              src={screenshot}
              alt="Project screenshot thumbnail"
              onClick={() => setActiveScreenshot(screenshot)}
              sx={{
                width: 80,
                height: 56,
                flex: "0 0 auto",
                objectFit: "cover",
                cursor: "pointer",
                border: "2px solid",
                borderColor: screenshot === activeScreenshot ? "primary.main" : "transparent",
              }}
            />
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [screenshots, setScreenshots] = useState([]);
  const [showOtherProjects, setShowOtherProjects] = useState(false);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/Amine-Triki/projects-data/main/projects.json")
      .then((res) => {
        if (!res.ok) throw new Error(`Projects request failed: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading projects:", error);
        setLoading(false);
      });
  }, []);

  const featuredProjects = projects.filter((project) => project.featured === true);
  const nonFeaturedProjects = projects.filter((project) => project.featured !== true);
  const categories = ["all", ...new Set(nonFeaturedProjects.map((project) => project.category))];
  const allProjects = nonFeaturedProjects.filter(
    (project) => activeCategory === "all" || project.category === activeCategory,
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <main>
      <Box py={5}>
        <Container maxWidth="xl">
          <Heading title="My Projects" subTitle="What I build" />
          <Typography variant="h4" color="primary" sx={{ mb: 3 }}>
            Featured Projects
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                md: "repeat(3, minmax(0, 1fr))",
              },
              gap: 4,
              mb: 6,
            }}
          >
            {featuredProjects.map((project) => (
              <Box key={project.title} sx={{ minWidth: 0 }}>
                <ProjectCard
                  project={project}
                  onOpenScreenshots={setScreenshots}
                />
              </Box>
            ))}
          </Box>

          {!showOtherProjects && nonFeaturedProjects.length > 0 && (
            <Box sx={{ display: "flex", justifyContent: "center", mb: 6 }}>
              <Button
                variant="contained"
                onClick={() => setShowOtherProjects(true)}
              >
                See more
              </Button>
            </Box>
          )}

          {showOtherProjects && (
            <>
              <Typography variant="h4" color="primary" sx={{ mb: 3 }}>
                Other Projects
              </Typography>
              <Box mb={4}>
                <Tabs
                  value={activeCategory}
                  onChange={(event, newValue) => setActiveCategory(newValue)}
                  centered
                  variant="scrollable"
                  scrollButtons="auto"
                  textColor="primary"
                  indicatorColor="primary"
                >
                  {categories.map((category) => (
                    <Tab
                      key={category}
                      value={category}
                      label={
                        <Typography
                          fontWeight={activeCategory === category ? 700 : 400}
                        >
                          {category === "all" ? "All works" : category}
                        </Typography>
                      }
                    />
                  ))}
                </Tabs>
              </Box>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, minmax(0, 1fr))",
                    md: "repeat(3, minmax(0, 1fr))",
                  },
                  gap: 4,
                }}
              >
                {allProjects.map((project) => (
                  <Box key={project.title} sx={{ minWidth: 0 }}>
                    <ProjectCard project={project} onOpenScreenshots={setScreenshots} />
                  </Box>
                ))}
              </Box>
            </>
          )}
        </Container>
      </Box>
      <ScreenshotDialog screenshots={screenshots} onClose={() => setScreenshots([])} />
    </main>
  );
};

export default Projects;