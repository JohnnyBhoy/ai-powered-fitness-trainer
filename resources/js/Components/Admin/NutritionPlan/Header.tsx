import { motion } from 'framer-motion';

const Header = ({title} : {title:string}) => {
    return (
        <motion.h1
            className="text-3xl font-bold mb-6 dark:bg-gray-900 dark:text-gray-100"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {title}
        </motion.h1>
    )
}

export default Header