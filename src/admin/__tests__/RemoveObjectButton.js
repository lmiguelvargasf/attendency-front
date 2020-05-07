import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import RemoveObjectButton from '../RemoveObjectButton'
import useAxios from 'axios-hooks'
jest.mock('axios-hooks')

describe('RemoveObjectButton component', () => {
  const object = { key: 1, url: 'https://example.com/api' }
  const executeMock = jest.fn()
  const removeObjectMock = jest.fn()
  let component

  beforeEach(() => {
    useAxios.mockReturnValue([{}, executeMock])
    component = (
      <RemoveObjectButton object={object} removeObject={removeObjectMock} />
    )
  })

  afterEach(cleanup)

  it('matches snapshot', () => {
    const { asFragment } = render(component)
    expect(asFragment()).toMatchSnapshot()
  })

  it('execute and removeObjectMock are called when clicking on component', async () => {
    const { getByTestId, getByText } = render(component)
    fireEvent.click(getByTestId(object.url))
    await fireEvent.click(getByText('OK'))
    expect(executeMock).toHaveBeenCalled()
    expect(removeObjectMock).toHaveBeenCalledWith(object)
  })
})
