import useSWR from 'swr'
import axios from '@/lib/axios'
export const getAllSubjects = () => {
    const { data: subjects, error } = useSWR('/api/subjects', () =>
        axios
            .get('/api/subjects')
            .then(res => res.data)
            .catch(error => {
                console.log(error)
            }),
    )
    let subjectOptions = []
    subjects?.forEach(subject => {
        let subjectOption = {}
        subjectOption.label = subject.subject_name
        subjectOption.value = subject.subject_name
        subjectOption.id = subject.subject_id
        subjectOptions.push(subjectOption)
    })
    return subjectOptions
}
