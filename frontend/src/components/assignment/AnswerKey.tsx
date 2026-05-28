export default function AnswerKey({
  sections,
}: any) {
  return (
    <div className="mt-20 border-t pt-10">
      
      <h2 className="text-3xl font-bold mb-8">
        Answer Key
      </h2>

      <div className="space-y-8">
        
        {sections.map(
          (
            section: any,
            index: number
          ) => (
            <div key={index}>
              
              <h3 className="text-xl font-semibold mb-4">
                {
                  section.title
                }
              </h3>

              <div className="space-y-4">
                
                {section.questions.map(
                  (
                    q: any,
                    i: number
                  ) => (
                    <div
                      key={i}
                      className="bg-gray-50 rounded-2xl p-5"
                    >
                      
                      <div className="font-medium mb-2">
                        Q{i + 1}.
                        {" "}
                        {
                          q.question
                        }
                      </div>

                      <div className="text-gray-600">
                        {
                          q.answer
                        }
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}