import React, { useState } from 'react';
import styles from './Search.module.css';
import { SearchProps } from './Search.props';
import cn from 'classnames';
import { Button, Input } from '..';
import SearchIcon from './search.svg';
import { useRouter } from 'next/dist/client/router';

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
    const [search, setSearch] = useState<string>('');

    const router = useRouter();

    const goToSearch = () => {
        router.push({
            pathname: '/search', query: {
                q: search
            }
        });
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') goToSearch();
    };

    return (
        <div className={cn(className, styles.search)} {...props}>
            <Input placeholder='Поиск...' value={search} onChange={(e) => setSearch(e.target.value)} className={styles.input} onKeyDown={handleKeyDown} />
            <Button appearance='primary' className={styles.button} onClick={goToSearch}>
                <SearchIcon />
            </Button>
        </div>
    );
};