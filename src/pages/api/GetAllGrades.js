import useSWR from 'swr'
import axios from '@/lib/axios'
export const getAllGrades = () => {
    const { data: grades, error } = useSWR('/api/grades', () =>
        axios
            .get('/api/grades')
            .then(res => res.data.grades)
            .catch(error => {
                console.log(error)
            }),
    )
    let gradeOptions = []
    grades?.forEach(grade => {
        let gradeOption = {}
        gradeOption.label = grade.name
        gradeOption.value = grade.name
        gradeOption.id = grade.id
        gradeOptions.push(gradeOption)
    })
    return gradeOptions
}
