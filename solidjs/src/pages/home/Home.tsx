import styles from "./Home.module.css";
export default () => {
  return (
    <div>
      <p>Hello and welcome,</p>
      <p>
        I go by the nicknames of <i>Ucat</i> and <i>Fon</i> and i've been
        building this tool on my spare time. You can contact me using discord,
        my handle is Fon#2880
      </p>
      <p>
        <b>Json viewer</b> is where you can download the raw files i use on this
        tool to check raw data or to create your own tool.
      </p>
      <p>
        <b>All items</b> is where you can find all items on the game as well as
        their recipes. It also allows you to input item prices and uses the
        recipe data to help you calculate your price for items. I got this data
        using the&nbsp;
        <a href="https://github.com/ZeelNightwolf/EcoDataExporter">
          EcoDataExporter
        </a>
        &nbsp;plugin.
      </p>
      <p>
        This is very much a work in progress and more sections should be added
        later.
      </p>
      <p>So stay tuned. And i hope you enjoy it</p>
      <br />
      <br />
      <div class={styles.changelog}>
        <h2>Latest changes</h2>
        <h3>2.0.0 (2021-11-21)</h3>
        <h4>Features</h4>
        <ul>
          <li>Added Ingame Market page</li>
          <li>Added Raw data page</li>
        </ul>
      </div>
    </div>
  );
};
