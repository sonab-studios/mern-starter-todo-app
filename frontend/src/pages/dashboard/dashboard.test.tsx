/* eslint-disable testing-library/no-unnecessary-act */
import { render, screen, act, fireEvent } from '@testing-library/react';

import * as api from 'api/toDoList';
import { Provider } from 'provider/Provider';
import { Dashboard } from 'pages/dashboard/Dashboard';

afterEach(() => {
    jest.clearAllMocks();
});

test('renders dashboard page', async () => {
    render(
        <Provider>
            <Dashboard />
        </Provider>,
    );

    const title = screen.getByText('List App');
    expect(title).toBeInTheDocument();

    const newList = screen.getByRole('button', { name: 'New List' });
    expect(newList).toBeInTheDocument();

    const logout = screen.getByRole('button', { name: 'Logout' });
    expect(logout).toBeInTheDocument();
});

test('renders lists', async () => {
    jest.spyOn(
        Object.getPrototypeOf(window.localStorage),
        'getItem',
    ).mockReturnValue(
        JSON.stringify({ email: 'foo.bar@test.com', token: 'my-token' }),
    );

    render(
        <Provider>
            <Dashboard />
        </Provider>,
    );

    jest.spyOn(api, 'createList').mockResolvedValue();
    jest.spyOn(api, 'getAllList').mockResolvedValue([
        {
            _id: '1',
            createdAt: '2023-05-07T01:33:22.548Z',
            updatedAt: '2023-05-07T01:33:22.548Z',
            name: 'List A',
        },
        {
            _id: '2',
            createdAt: '2023-05-07T01:33:22.558Z',
            updatedAt: '2023-05-07T01:33:22.558Z',
            name: 'List B',
        },
        {
            _id: '3',
            createdAt: '2023-05-07T01:33:22.568Z',
            updatedAt: '2023-05-07T01:33:22.568Z',
            name: 'List C',
        },
    ]);

    //dummy perform add to refresh
    const newList = screen.getByRole('button', { name: 'New List' });
    expect(newList).toBeInTheDocument();

    await act(() => {
        fireEvent.click(newList);
    });

    const titleInput = screen.getByPlaceholderText('New List') as HTMLInputElement;
    expect(titleInput).toBeInTheDocument();
    
    const saveList = screen.getByTestId('create-list')
    expect(saveList).toBeInTheDocument();

    await act(() => {
        fireEvent.click(saveList);
    });

    const list1 = screen.getByRole('button', { name: 'List A' });
    expect(list1).toBeInTheDocument();

    const list2 = screen.getByRole('button', { name: 'List B' });
    expect(list2).toBeInTheDocument();

    const list3 = screen.getByRole('button', { name: 'List C' });
    expect(list3).toBeInTheDocument();
});
