import { CheckCircle, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Contest } from '@/types/contest'

interface ContestGuidelinesProps {
  contest: Contest
}

export function ContestGuidelines({ contest }: ContestGuidelinesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-xl">
          <CheckCircle className="h-5 w-5 text-green-500" />
          応募条件・ガイドライン
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3 text-green-700">応募条件</h4>
            <ul className="space-y-2">
              {contest.requirements.map((requirement, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3 text-blue-700">ガイドライン</h4>
            <ul className="space-y-2">
              {contest.guidelines.map((guideline, index) => (
                <li key={index} className="flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{guideline}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 