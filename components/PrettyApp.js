import React, { useState, useContext, useEffect } from "react";
import styles from "../styles/prettyApp.module.scss";
import SelectedContext from "../ctx/SelectedContext";

let PrettyApp = ({ app, all }) => {
  const [selected, setSelected] = useState(false);
  const { selectedApps, setSelectedApps } = useContext(SelectedContext);

  useEffect(() => {
    let found = selectedApps.findIndex((a) => a._id === app._id) !== -1;

    setSelected(found);
  }, [selectedApps, app._id]);

  let handleAppSelect = () => {
    let found = selectedApps.findIndex((a) => a._id === app._id);

    if (found !== -1) {
      let updatedSelectedApps = selectedApps.filter(
        (a, index) => index !== found
      );

      setSelectedApps(updatedSelectedApps);
      setSelected(false);
    } else {
      setSelected(true);

      if (all) {
        app = all.find((i) => app._id == i._id);
        setSelectedApps([...selectedApps, app]);
      } else {
        setSelectedApps([...selectedApps, app]);
      }
    }
  };

  if (!app && !app.img) return <></>;

  return (
    <li
      key={app._id}
      onClick={handleAppSelect}
      className={`${styles.app} ${selected ? styles.selected : ""}`}
    >
        <div>
            <div className={styles.imgContainer}>
            <picture>
                <source srcSet={`./assets/apps/${app.img}`} type="image/webp" />
                <source
                srcSet={`./assets/apps/fallback/${app.img.replace(
                    "webp",
                    "png"
                )}`}
                type="image/png"
                />
                <img
                src={`./assets/apps/fallback/${app.img.replace("webp", "png")}`}
                alt={`Logo for ${app.name}`}
                draggable={false}
                />
            </picture>
            </div>
            <h3 className={styles.imgHeader}>{app.name}</h3>
        </div>
    </li>
  );
};

export default PrettyApp;
