'use client';

interface Step {
  id: string;
  title: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div>
      <nav className="px-4 sm:px-6">
        <ol className="flex items-center">
          {steps.map((step, index) => (
            <li key={step.id} className="relative flex-1">
              <div className="group flex items-center flex-col justify-center items-center">
                <span
                  className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep
                      ? 'text-black'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                  style={index <= currentStep ? { backgroundColor: '#25F4EE' } : {}}
                >
                  {index + 1}
                </span>
                <span
                  className={`mt-2 text-sm font-medium whitespace-nowrap ${
                    index <= currentStep ? 'text-gray-900' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`hidden sm:block absolute h-0.5 top-4 -translate-y-1/2 ${
                    index < currentStep ? '' : 'bg-gray-200'
                  }`}
                  style={{ 
                    left: 'calc(50% + 1rem)', 
                    right: 'calc(-50% + 1rem)',
                    backgroundColor: index < currentStep ? '#25F4EE' : undefined
                  }}
                />
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
} 