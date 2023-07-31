import { Link } from "react-router-dom/cjs/react-router-dom.min";

const NotFound = () => {
  return (
    <main>
      <h2>Silly Goose this is not a Page</h2>
      <p>
        Once upon a time in the whimsical land of the internet, a mischievous
        tech-savvy character, let's call him "Hacker Harry," decided to take on
        the ultimate challenge – breaking into a website guarded by the most
        formidable digital defenses. Armed with a keyboard and an unhealthy
        amount of energy drinks, Harry began his quest, typing away like a mad
        maestro conducting an orchestra of ones and zeroes. But little did he
        know, this website was no ordinary fortress; it was protected by the
        fearsome firewall of a mythical cybersecurity wizard. As Harry's fingers
        danced across the keys, the website seemed to chuckle, shaking off his
        futile attempts like a dog shrugging off raindrops. With each failed
        try, the website's error messages appeared to mock him, teasingly
        suggesting he try something other than "12345" as a password.
        Undeterred, Harry persisted, until finally, he received an unexpected
        response: "Error 404 – Harry's hacking skills not found!" The website
        had spoken, leaving Harry to ponder the wisdom of his ways while nursing
        a bruised ego and a newfound respect for the enchanted realm of
        cybersecurity.
      </p>
      <div>
        Go to the <Link to="/" >Main Page</Link>
      </div>
    </main>
  );
};

export default NotFound
