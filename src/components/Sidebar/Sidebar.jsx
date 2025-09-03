import React, { useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@emotion/react";
import { useGetGenresQuery } from "../../services/TMDB";
const redLogo =
  "https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png";
const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];
const blueLogo =
  "https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png";
import genreIcons from "../../assets/genres";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import "./Sidebar.css";
const Sidebar = ({ setMobileOpen }) => {
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );

  const theme = useTheme();
  const { data, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();
  console.log(theme.palette.mode);
  useEffect(() => {
    setMobileOpen(false);
  }, [genreIdOrCategoryName]);
  return (
    <>
      <Link
        to="/"
        style={{ display: "flex", justifyContent: "center", padding: "10% 0" }}
      >
        <h1
          style={{
            color: "blue",
            fontWeight: "bold",
            fontSize: "30px",
            fontStyle: "italic",
          }}
        >
          Cineverse
        </h1>
      </Link>

      <Divider />
      <List>
        <ListSubheader> Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link
            key={value}
            to="/"
            style={{
              color: theme.palette.text.primary,
              textDecoration: "none",
            }}
          >
            <ListItem
              onClick={() => dispatch(selectGenreOrCategory(value))}
              button
            >
              {
                <ListItemIcon>
                  <img
                    src={genreIcons[label.toLowerCase()]}
                    className="gerneImage"
                    height={30}
                    style={{
                      filter: theme.palette.mode === "dark" ? "invert(1)" : "",
                    }}
                  />
                </ListItemIcon>
              }
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader> Genres </ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress size="4rem" />
          </Box>
        ) : (
          data.genres.map(({ id, name }) => (
            <Link
              key={id}
              to="/"
              style={{
                color: theme.palette.text.primary,
                textDecoration: "none",
              }}
            >
              <ListItem
                onClick={() => dispatch(selectGenreOrCategory(id))}
                button
              >
                {
                  <ListItemIcon>
                    <img
                      src={genreIcons[name.toLowerCase()]}
                      className="genreImage"
                      height={30}
                      style={{
                        filter:
                          theme.palette.mode === "dark" ? "invert(1)" : "",
                      }}
                    />
                  </ListItemIcon>
                }
                <ListItemText primary={name} sx={{ fontSize: "50px" }} />
              </ListItem>
            </Link>
          ))
        )}
      </List>
    </>
  );
};

export default Sidebar;
