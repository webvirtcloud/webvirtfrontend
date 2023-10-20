import DockerIcon from '@/icons/docker';

export function DockerButton() {
  return (
    <a
      target="_blank"
      href="https://hub.docker.com/u/webvirtcloud"
      className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-gradient-to-l from-blue-600 to-cyan-500 px-8 font-medium text-white outline-none transition-transform duration-300 hover:scale-105"
    >
      <DockerIcon className="h-6 w-6" />
      Run in Docker
    </a>
  );
}
