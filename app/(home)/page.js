import {migrateProducts} from '@/actions/migrateProducts'
export default function home (){
    migrateProducts ()
    return(
        <div>
            home
        </div>
    )
}