import GitHubButton from "react-github-btn";

const GithubIcon = () => {
  return (
    <div className="pt-1 ml-10">
      <GitHubButton
        href="https://github.com/prithvianilk/i-love-kanye"
        data-icon="octicon-star"
        data-size="large"
        aria-label="Star prithvianilk/i-love-kanye on GitHub"
        data-text="Star on Github"
      />
    </div>
  );
};

export default GithubIcon;
