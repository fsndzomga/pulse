import { Button } from '@/components/ui/button';
import { Activity, Brain, Heart, ArrowRight } from 'lucide-react';
import { HealthMetricsChart } from '@/components/health-metrics-chart';

export default function HomePage() {
  return (
    <main className="bg-background text-foreground">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Take control of your health with
                <span className="block text-primary">Pulse</span>
              </h1>
              <p className="mt-3 text-base text-muted-foreground sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Track your health metrics, get AI-driven coaching, and stay motivated on your journey to a healthier lifestyle.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <Button asChild size="lg" className="rounded-full px-8">
                  <a href="/dashboard">
                    Start Your Health Journey
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <HealthMetricsChart />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                <Activity className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium">
                  Track Your Progress
                </h2>
                <p className="mt-2 text-base text-muted-foreground">
                  Monitor your health metrics, including weight, activity levels, and nutrition, to stay on top of your goals.
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                <Brain className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium">
                  AI-Driven Coaching
                </h2>
                <p className="mt-2 text-base text-muted-foreground">
                  Receive personalized advice and motivation from our advanced AI coach to help you make healthier choices.
                </p>
              </div>
            </div>

            <div className="mt-10 lg:mt-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground">
                <Heart className="h-6 w-6" />
              </div>
              <div className="mt-5">
                <h2 className="text-lg font-medium">
                  Community Support
                </h2>
                <p className="mt-2 text-base text-muted-foreground">
                  Connect with others on similar health journeys, share experiences, and motivate each other to succeed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold sm:text-4xl">
                Ready to transform your health?
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-muted-foreground">
                Join Pulse today and take the first step towards a healthier, happier you. Our comprehensive tools and AI-driven insights are here to support you every step of the way.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 flex justify-center lg:justify-end">
              <Button asChild size="lg" className="rounded-full px-12">
                <a href="/dashboard">
                  Get Started Now
                  <ArrowRight className="ml-3 h-6 w-6" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
