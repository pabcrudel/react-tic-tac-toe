export default function Footer() {
  return (
    <footer>
      <header>
        <section id="social-media-links">
          <h3 className="title">Social media links</h3>
          <nav>
            <ul>
              <li>
                <a href="https://github.com/pabcrudel"
                  title="Overview of my GitHub Profile">GitHub</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/pablocrudelhom"
                  title="Take a look at my LinkedIn profile">LinkedIn</a>
              </li>
            </ul>
          </nav>
        </section>
  
        <section id="report-issue">
          <h3 className="title">Report an Issue</h3>
          <p>
            If you found a bug or have a suggestion, please <a
            href="https://github.com/pabcrudel/react-tic-tac-toe/issues"
            title="Suggest me a change by creating an issue"
            >open an issue on GitHub</a>.
          </p>
        </section>
      </header>
  
      <aside id="copyright">
        <p>
          &copy; Copyright <time dateTime="2023">2023</time> Pablo Cru.
          <a
            href="https://github.com/pabcrudel/react-tic-tac-toe/blob/main/LICENSE"
            title="Take a look at the permissions, limitations and conditions">
            MIT License</a>.
        </p>
      </aside>
    </footer>
  )
}