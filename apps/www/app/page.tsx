import GithubIcon from '@/icons/github';
import cx from 'clsx';
import { HomeHeader } from '@/app/header';
import { features } from './features';
import Link from 'next/link';
import { buttonVariants } from '@/components/button';

export default function Page() {
  return (
    <>
      <HomeHeader />

      <main className="container relative mx-auto px-4 pb-32 md:px-8">
        <section id="features" className="relative mx-auto max-w-6xl py-32">
          <h2 className="mb-4 text-center text-4xl font-bold">Core features</h2>
          <p className="text-muted-foreground mb-16 text-center text-xl">
            WebVirtCloud shipped with the most popular tools.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.name}
                className={cx(['bg-muted/20 rounded-xl border px-6 py-8 shadow-sm'])}
              >
                <div className="mb-4 text-sky-500">
                  <feature.icon
                    className={cx(['h-6 w-6', feature.coming && 'text-muted-foreground'])}
                  />
                </div>
                <div className="space-y-2">
                  <h3
                    className={cx([
                      'font-medium',
                      feature.coming ? 'text-neutral-600 dark:text-neutral-400' : '',
                    ])}
                  >
                    {feature.name}
                    {feature.coming && (
                      <span className="ml-2 rounded-md bg-yellow-200/50 px-1.5 py-1 text-xs font-medium text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-500">
                        coming soon
                      </span>
                    )}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section id="benefits" className="relative mx-auto max-w-6xl py-16 md:py-32">
          <h2 className="mb-4 text-center text-5xl font-bold">Benefits</h2>
          <p className="text-muted-foreground mb-16 text-center text-xl">
            Our web interface offers several benefits that make it the ideal tool <br />{' '}
            for managing your cloud platform
          </p>
          <div className="mb-4 grid gap-4 md:grid-cols-12">
            <div className="bg-muted/20 relative flex flex-col justify-end overflow-hidden rounded-xl border p-8 pt-16 md:col-span-7">
              <h3 className="mb-2 text-2xl font-medium">Ease of use</h3>
              <p className="text-muted-foreground">
                Our interface is designed to be user-friendly and intuitive, making it
                easy for even non-technical users to manage their virtual machines.
              </p>
            </div>
            <div className="bg-muted/20 relative flex flex-col justify-end overflow-hidden rounded-xl border p-8 pt-16 md:col-span-5">
              <h3 className="mb-2 text-2xl font-medium">Time-saving</h3>
              <p className="text-muted-foreground">
                With our interface, you can perform virtual machine management tasks
                quickly and easily, saving you time and effort.
              </p>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-12">
            <div className="bg-muted/20 relative flex flex-col justify-end overflow-hidden rounded-xl border p-8 pt-16 md:col-span-5">
              <h3 className="mb-2 text-2xl font-medium">Increased efficiency</h3>
              <p className="text-muted-foreground">
                Our interface allows you to manage multiple virtual machines from a single
                interface, which increases your efficiency and productivity.
              </p>
            </div>
            <div className="bg-muted/20 relative flex flex-col justify-end overflow-hidden rounded-xl border p-8 pt-16 md:col-span-7">
              <h3 className="mb-2 text-2xl font-medium">Cost-saving</h3>
              <p className="text-muted-foreground">
                By managing your virtual machines more efficiently, you can save on
                resources and reduce your overall costs, because you use self-hosted
                solution
              </p>
            </div>
          </div>
        </section>
        <section
          id="get-started"
          className="bg-muted/20 relative mx-auto mt-16 max-w-6xl space-y-16 rounded-xl border px-4 py-16 md:px-8 md:py-32"
        >
          <div className="space-y-8 text-center">
            <h2 className="text-3xl font-semibold md:text-5xl">
              The cloud platform you <br />
              want, try it now
            </h2>
            <p className="text-muted-foreground mx-auto max-w-4xl text-lg md:text-xl md:leading-relaxed">
              We provide detailed documentation to help you get started, and our support
              team is always available to assist you if you have any questions or issues.
            </p>

            <div className="flex items-center justify-center gap-4">
              <Link
                className={cx(buttonVariants({ size: 'default', variant: 'default' }))}
                href="/docs/introduction"
              >
                Try it now
              </Link>
              <a
                href="https://github.com/webvirtcloud/"
                target="_blank"
                className={cx(buttonVariants({ size: 'default', variant: 'outline' }))}
              >
                <GithubIcon className="mr-2" />
                Give a star
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
