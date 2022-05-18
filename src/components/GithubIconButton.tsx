import GitHubButton from "react-github-btn";

const GithubIconButton = () => {
  return (
    <div className="pt-2 sm:pt-1.5 ml-10">
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

export default GithubIconButton;
