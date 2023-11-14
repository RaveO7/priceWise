'use client'
import { scrappAndStoreProduct } from '@/lib/actions';
import React, { FormEvent, useState } from 'react'
import Loading from '../components/Loading';

const isValidAmazonProductUrl = (url: string) => {
    try {
        const parseUrl = new URL(url);
        const hostName = parseUrl.hostname;

        if (
            hostName.includes('amazon.com') ||
            hostName.includes('amazon.') ||
            hostName.endsWith('amazon')
        ) {
            return true
        }
    } catch (error) {
        return false
    }
    return false
}

const SearchBar = () => {
    const [searchPrompt, setSearchPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const isValidLink = isValidAmazonProductUrl(searchPrompt)
        
        if (!isValidLink) return alert('Please provide a Amazon link.')

        try {
            setIsLoading(true);
            const product = await scrappAndStoreProduct(searchPrompt)
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }
    
    return (
        <form className='flex flex-wrap gap-4 mt-12'
            onSubmit={handleSubmit}>
            <input
                className='searchbar-input'
                type='text'
                placeholder='Enter product link'
                value={searchPrompt}
                onChange={(e) => setSearchPrompt(e.target.value)}
            />

            <button
                type='submit'
                className='searchbar-btn'
                disabled={searchPrompt === ''}>
                {isLoading ? <Loading /> : 'Search'}
            </button>
        </form>
    )
}

export default SearchBar