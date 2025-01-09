import React, { useEffect, useRef, useState } from 'react';
import { FileUploadProps } from './types';
import { Flex, Text } from '@/styles/global';
import { FileUploadImage, FileUploadWrapper } from './styles';
import { Button } from '../Button';
import { useConfig } from '@/contexts/ConfigContext';
import { Formatter } from '@/utils';
import NextImage from 'next/image';

export const FileUpload: React.FC<FileUploadProps> = ({ file, isValid, onChange }) => {
    const config = useConfig();

    const fileRef = useRef<HTMLInputElement>(null);
    const [src, setSrc] = useState('');

    const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            onChange(file);
        }
    };

    useEffect(() => {
        if (file) {
            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = (e) => {
                setSrc(e.target?.result as string);
            };
        } else {
            fileRef.current?.value && (fileRef.current.value = '');
            setSrc('');
        }

        return () => {
            setSrc('');
        };
    }, [file]);

    return (
        <Flex width="100%">
            <input type="file" onChange={handleOnchange} hidden ref={fileRef} accept="image/png, image/jpeg" />

            <FileUploadWrapper>
                <Flex flexDirection="column" gap={0}>
                    <Text>File size must be less 200KB</Text>
                    <Text color={config.theme.gray}>Supported types: .jpeg .jpg .png</Text>
                </Flex>

                <Flex alignItems="center">
                    {src && (
                        <Flex flexDirection="column" alignItems="center" gap={2}>
                            <FileUploadImage>
                                <NextImage src={src} alt="" width={40} height={40} />
                            </FileUploadImage>
                            {file && <Text color={isValid ? 'white' : 'red'}>{Formatter.formatFileSize(file.size)}</Text>}
                        </Flex>
                    )}
                    <Button.Secondary onClick={() => fileRef.current?.click()}>Click to select file</Button.Secondary>
                </Flex>
            </FileUploadWrapper>
        </Flex>
    );
};
