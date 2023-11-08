import { useState, useEffect } from 'react'
import { UserId } from '@/types/user'
import { api } from '@/utils/api'
import { getCookie } from 'cookies-next'

export async function userlogin(setUserData) {
  if (typeof window !== 'undefined') {
    try {
      const response = await api.get('/users/', {
        headers: {
          Authorization: `Token ${getCookie('token')}`,
        },
      })
      setUserData(response.data[0]) // Atualiza o estado userData com os dados do usuário
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }
}

export default function Settings_User({ screens }) {
  const [widthform, setAlingForm] = useState('')
  const [selectedOption, setSelectedOption] = useState('')
  const [userData, setUserData] = useState<UserId | null>(null)
  const [userIdData, setUserIdData] = useState<UserId | null>(null)

  useEffect(() => {
    userlogin(setUserData) // Chamada para buscar os dados do usuário e atualizar o estado userData
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      ;async () => {
        try {
          const response = await api.get(`/users/${userData?.id}/`, {
            headers: {
              Authorization: `Token ${getCookie('token')}`,
            },
          })
          setUserIdData(response.data) // Atualiza o estado userData com os dados do usuário
        } catch (error) {
          console.error('Error fetching user:', error)
        }
      }
    }
  }),
    [userIdData]

  const handleUpdateName = async (newName: string) => {
    try {
      const updateAccountData = {
        id: userData?.id,
        name: newName || userData?.name,
        cpf: userData?.cpf,
        email: userData?.email,
        phone: userData?.phone,
      }
      const response = await api.patch(
        `/users/${userData?.id}/`,
        updateAccountData,
        {
          headers: {
            Authorization: `Token ${getCookie('token')}`,
          },
        },
      )
      window.location.href = '/account'
      // Verificar se a requisição foi bem-sucedida e exibir o alerta
      if (response.status === 200) {
        alert('Nome atualizado com sucesso!')
      }

      // Restaurar os campos do formulário para vazio após a atualização
      window.location.href = '/account'
      // Atualizar o estado do enderesso selecionado com os novos dados
    } catch (error) {
      console.error('Erro ao atualizar o endereço:', error)
    }
  }

  const handleUpdateEmail = async (oldEmail: string, newEmail: string) => {
    try {
      const updateAccountData = {
        id: userData?.id,
        name: userData?.name,
        cpf: userData?.cpf,
        email: newEmail || userData?.email,
        phone: userData?.phone,
      }
      if (oldEmail === userData?.email) {
        const response = await api.patch(
          `/users/${userData?.id}/`,
          updateAccountData,
          {
            headers: {
              Authorization: `Token ${getCookie('token')}`,
            },
          },
        )

        // Verificar se a requisição foi bem-sucedida e exibir o alerta
        if (response.status === 200) {
          alert('Email atualizado com sucesso!')
          // Redirecionar para a página de conta

          window.location.href = '/account'
        }
      } else if (oldEmail !== userData?.email) {
        alert('Email atual não compativel')
      }
    } catch (error) {
      console.error('Erro ao atualizar o e-mail:', error)
    }
  }

  const handleUpdatePhone = async (newNumber: string) => {
    try {
      const updateAccountData = {
        id: userData?.id,
        name: userData?.name,
        cpf: userData?.cpf,
        email: userData?.email,
        phone: newNumber || userData?.phone,
      }
      const response = await api.patch(
        `/users/${userData?.id}/`,
        updateAccountData,
        {
          headers: {
            Authorization: `Token ${getCookie('token')}`,
          },
        },
      )
      window.location.href = '/account'
      // Verificar se a requisição foi bem-sucedida e exibir o alerta
      if (response.status === 200) {
        alert('Numero de contato atualizado com sucesso!')
      }

      // Restaurar os campos do formulário para vazio após a atualização
      window.location.href = '/account'
      // Atualizar o estado do enderesso selecionado com os novos dados
    } catch (error) {
      console.error('Erro ao atualizar o endereço:', error)
    }
  }

  const handleUpdateCpf = async (newcpf: string) => {
    try {
      const updateAccountData = {
        id: userData?.id,
        name: userData?.name,
        cpf: newcpf || userData?.cpf,
        email: userData?.email,
        phone: userData?.phone,
      }
      const response = await api.patch(
        `/users/${userData?.id}/`,
        updateAccountData,
        {
          headers: {
            Authorization: `Token ${getCookie('token')}`,
          },
        },
      )
      window.location.href = '/account'
      // Verificar se a requisição foi bem-sucedida e exibir o alerta
      if (response.status === 200) {
        alert('CPF atualizado com sucesso!')
      }

      // Restaurar os campos do formulário para vazio após a atualização
      window.location.href = '/account'
      // Atualizar o estado do enderesso selecionado com os novos dados
    } catch (error) {
      console.error('Erro ao atualizar o CPF:', error)
    }
  }
  const handleUpdatePassword = async (
    oldpassword: string,
    newpassword: string,
  ) => {
    try {
      const updateAccountData = {
        id: userData?.id,
        name: userData?.name,
        cpf: userData?.cpf,
        email: userData?.email,
        phone: userData?.name,
      }
      if (oldpassword != '') {
        const response = await api.patch(
          `/users/${userData?.id}/`,
          updateAccountData,
          {
            headers: {
              Authorization: `Token ${getCookie('token')}`,
            },
          },
        )

        // Verificar se a requisição foi bem-sucedida e exibir o alerta
        if (response.status === 200) {
          alert('Senha atualizado com sucesso!')
          // Redirecionar para a página de conta

          window.location.href = '/account'
        } else if (oldpassword == '') {
          alert('Essa senha atual não incoreta')
        }
      }
    } catch (error) {
      console.error('Erro ao atualizar o e-mail:', error)
    }
  }

  // const handleUpdatePassword = async (newPassword) => {
  //   try {
  //     // Faz a chamada para a API para atualizar a senha do usuário
  //     await api.patch("/user", { password: newPassword });
  //     console.log("Senha do usuário atualizada!");
  //     // Atualiza o estado local com a nova senha
  //     setUserData({ ...userData, password: newPassword });
  //     setSelectedOption("");
  //   } catch (error) {
  //     console.error("Erro ao atualizar senha do usuário:", error);
  //   }
  // };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (screens.isLargeScreen) {
        setAlingForm('w-[1145px]')
      } else if (screens.isMediumScreen) {
        setAlingForm('w-[880px]')
      } else if (screens.isSmallScreen) {
        setAlingForm('w-[666px]')
      } else if (screens.isNanoScreen) {
        setAlingForm('w-[380px]')
      } else if (screens.isSmallNanoScreen) {
        setAlingForm('w-[280px]')
      } else {
        setAlingForm('w-[183px]')
      }
    }
  }, [
    screens.isLargeScreen,
    screens.isMediumScreen,
    screens.isSmallScreen,
    screens.isNanoScreen,
    screens.isSmallNanoScreen,
  ])

  const handleOptionSelection = (option) => {
    setSelectedOption(option)
  }

  const EditNameForm = () => {
    const [newName, setNewName] = useState('') // Novo state para armazenar o novo nome digitado

    return (
      <>
        <div className="flex flex-col gap-2">
          <label className="font-bold">Novo nome</label>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="mb-4 w-fit max-w-[700px] rounded-lg bg-[#FFFFFF] px-2 py-2  focus:outline-[#FEBD2F]   active:outline-[#ffae00]"
          />
        </div>
        <div className="flex flex-row flex-wrap gap-6">
          <button
            className="hove:text-black mt-2 flex max-h-[35px] w-fit max-w-[300px] cursor-pointer items-center rounded-md bg-[#8888] pl-2 pr-2 text-black hover:bg-white active:bg-black active:text-[#8888]"
            onClick={() => setSelectedOption('')}
          >
            Voltar
          </button>
          <button
            className="mt-2 flex max-h-[35px] w-fit max-w-[300px] cursor-pointer items-center rounded-md bg-primary pl-2 pr-2 hover:bg-primary-dark active:bg-primary-dark-bold active:text-primary-dark"
            onClick={() => handleUpdateName(newName)} // Chama a função handleUpdateName com o novo nome digitado
          >
            Salvar nome
          </button>
        </div>
      </>
    )
  }

  const EditEmailForm = () => {
    const [oldEmail, setOldEmail] = useState('')
    const [newEmail, setNewEmail] = useState('')
    return (
      <>
        <div className="flex flex-col gap-2">
          <label className="font-bold">Email Atual</label>
          <input
            type="email"
            value={oldEmail}
            onChange={(e) => setOldEmail(e.target.value)}
            className="mb-4 w-fit max-w-[700px] rounded-lg bg-[#FFFFFF] px-2 py-2  focus:outline-[#FEBD2F]   active:outline-[#ffae00]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold">Novo Email</label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="mb-4 w-fit max-w-[700px] rounded-lg bg-[#FFFFFF] px-2 py-2  focus:outline-[#FEBD2F]   active:outline-[#ffae00]"
          />
        </div>
        <div className="flex flex-row flex-wrap gap-6">
          <button
            className="hove:text-black mt-2 flex max-h-[35px] w-fit max-w-[300px] cursor-pointer items-center rounded-md bg-[#8888] pl-2 pr-2 text-black hover:bg-white active:bg-black active:text-[#8888]"
            onClick={() => setSelectedOption('')}
          >
            Voltar
          </button>
          <button
            className="mt-2 flex max-h-[35px] w-fit max-w-[300px] cursor-pointer items-center rounded-md bg-primary pl-2 pr-2 hover:bg-primary-dark active:bg-primary-dark-bold active:text-primary-dark"
            onClick={() => handleUpdateEmail(oldEmail, newEmail)}
          >
            Salvar novo Email
          </button>
        </div>
      </>
    )
  }

  const EditDDDForm = () => {
    const [newNumber, setNewNumber] = useState('')
    return (
      <>
        <div className="flex flex-col gap-2">
          <label className="font-bold">Novo telefone</label>
          <input
            type="text"
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
            className="mb-4 w-fit max-w-[700px] rounded-lg bg-[#FFFFFF] px-2 py-2  focus:outline-[#FEBD2F]   active:outline-[#ffae00]"
          />
        </div>
        <div className="flex flex-row flex-wrap gap-6">
          <button
            className="hove:text-black mt-2 flex max-h-[35px] w-fit max-w-[300px] cursor-pointer items-center rounded-md bg-[#8888] pl-2 pr-2 text-black hover:bg-white active:bg-black active:text-[#8888]"
            onClick={() => setSelectedOption('')}
          >
            Voltar
          </button>
          <button
            className="mt-2 flex max-h-[35px] w-fit max-w-[300px] cursor-pointer items-center rounded-md bg-primary pl-2 pr-2 hover:bg-primary-dark active:bg-primary-dark-bold active:text-primary-dark"
            onClick={() => handleUpdatePhone(newNumber)} // Chama a função handleUpdateName com o novo nome digitado
          >
            Salvar Numero
          </button>
        </div>
      </>
    )
  }

  const EditCPFForm = () => {
    const [newcpf, setNewcpf] = useState('')
    return (
      <>
        <div className="flex flex-col gap-2">
          <label className="font-bold">Novo CPF</label>
          <input
            type="text"
            value={newcpf}
            onChange={(e) => setNewcpf(e.target.value)}
            className="mb-4 w-fit max-w-[700px] rounded-lg bg-[#FFFFFF] px-2 py-2  focus:outline-[#FEBD2F]   active:outline-[#ffae00]"
          />
        </div>
        <div className="flex flex-row flex-wrap gap-6">
          <button
            className="hove:text-black mt-2 flex max-h-[35px] w-fit max-w-[300px] cursor-pointer items-center rounded-md bg-[#8888] pl-2 pr-2 text-black hover:bg-white active:bg-black active:text-[#8888]"
            onClick={() => setSelectedOption('')}
          >
            Voltar
          </button>
          <button
            className="mt-2 flex max-h-[35px] w-fit max-w-[300px] cursor-pointer items-center rounded-md bg-primary pl-2 pr-2 hover:bg-primary-dark active:bg-primary-dark-bold active:text-primary-dark"
            onClick={() => handleUpdateCpf(newcpf)}
          >
            Salvar CPF
          </button>
        </div>
      </>
    )
  }

  const EditPasswordForm = () => {
    const [oldpassword, setOldPassword] = useState('')
    const [newpassword, setNewPassword] = useState('')
    return (
      <>
        <div className="flex flex-col gap-2">
          <label className="font-bold">Senha Atual</label>
          <input
            type="password"
            value={oldpassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="mb-4 w-fit max-w-[700px] rounded-lg bg-[#FFFFFF] px-2 py-2  focus:outline-[#FEBD2F]   active:outline-[#ffae00]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-bold">Nova Senha</label>
          <input
            type="password"
            value={newpassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="mb-4 w-fit max-w-[700px] rounded-lg bg-[#FFFFFF] px-2 py-2  focus:outline-[#FEBD2F]   active:outline-[#ffae00]"
          />
        </div>
        <div className="flex flex-row flex-wrap gap-6">
          <button
            className="hove:text-black mt-2 flex max-h-[35px] w-fit max-w-[300px] cursor-pointer items-center rounded-md bg-[#8888] pl-2 pr-2 text-black hover:bg-white active:bg-black active:text-[#8888]"
            onClick={() => setSelectedOption('')}
          >
            Voltar
          </button>
          <button
            className="mt-2 flex max-h-[35px] w-fit max-w-[300px] cursor-pointer items-center rounded-md bg-primary pl-2 pr-2 hover:bg-primary-dark active:bg-primary-dark-bold active:text-primary-dark"
            onClick={() => handleUpdatePassword(oldpassword, newpassword)}
          >
            Salvar nova Senha
          </button>
        </div>
      </>
    )
  }
  const renderForm = () => {
    if (selectedOption === 'email') {
      return <EditEmailForm />
    } else if (selectedOption === 'name') {
      return <EditNameForm />
    } else if (selectedOption === 'ddd') {
      return <EditDDDForm />
    } else if (selectedOption === 'password') {
      return <EditPasswordForm />
    } else if (selectedOption === 'cpf') {
      return <EditCPFForm />
    } else {
      return (
        <>
          <div className="flex flex-row items-center md:gap-2">
            <div className="flex flex-col gap-2">
              <label className="font-bold">Nome</label>
              <input
                type="text"
                value={userData?.name || 'ainda não tem um nome...'}
                className={`mb-4 w-fit max-w-[700px] cursor-no-drop rounded-md border-2 border-solid bg-[#FFFfFF]  px-2 py-2 hover:border-black ${
                  userData?.name !== '' ? '' : 'font-semibold text-red-600'
                }`}
                disabled
              />
            </div>
            <button
              className="mt-2 flex  max-h-[35px] w-fit max-w-[300px] items-center rounded-md bg-primary pl-2 pr-2 hover:bg-primary-dark active:bg-primary-dark-bold active:text-primary-dark"
              onClick={() => handleOptionSelection('name')}
            >
              Editar
            </button>
          </div>
          <div className="flex flex-row items-center md:gap-2">
            <div className="gap 2 flex flex-col">
              <label className="font-bold">Email</label>
              <input
                type="text"
                value={userData?.email}
                className={`mb-4 w-fit max-w-[700px] cursor-no-drop rounded-md border-2 border-solid bg-[#FFFFfF]  px-2 py-2 hover:border-black ${
                  userData?.email !== '' ? '' : 'font-semibold text-red-600'
                }`}
                disabled
              />
            </div>
            <button
              className="mt-2 flex max-h-[35px] w-fit max-w-[300px] cursor-pointer items-center rounded-md bg-primary pl-2 pr-2 hover:bg-primary-dark active:bg-primary-dark-bold active:text-primary-dark"
              onClick={() => handleOptionSelection('email')}
            >
              Editar
            </button>
          </div>
          <div className="flex flex-row items-center md:gap-2">
            <div className="gap 2 flex flex-col">
              <label className="font-bold">Telefone</label>
              <input
                type="text"
                value={userData?.phone || 'não há Informação'}
                className={`mb-4 w-fit max-w-[700px] cursor-no-drop rounded-md border-2 border-solid bg-[#FFFFfF]  px-2 py-2 hover:border-black ${
                  userData?.phone !== '' ? '' : 'font-semibold text-red-600'
                }`}
                disabled
              />
            </div>
            <button
              className="mt-2 flex max-h-[35px] w-fit max-w-[300px] cursor-pointer items-center rounded-md bg-primary pl-2 pr-2 hover:bg-primary-dark active:bg-primary-dark-bold active:text-primary-dark"
              onClick={() => handleOptionSelection('ddd')}
            >
              Editar
            </button>
          </div>
          <div className="flex flex-row items-center md:gap-2">
            <div className="gap 2 flex flex-col">
              <label className="font-bold">CPF</label>
              <input
                type="text"
                value={userData?.cpf || 'não há Informação'}
                className={`mb-4 w-fit max-w-[700px] cursor-no-drop rounded-md border-2 border-solid bg-[#FFFFfF]  px-2 py-2 hover:border-black ${
                  userData?.phone !== '' ? '' : 'font-semibold text-red-600'
                }`}
                disabled
              />
            </div>
            <button
              className="mt-2 flex max-h-[35px] w-fit max-w-[300px] cursor-pointer items-center rounded-md bg-primary pl-2 pr-2 hover:bg-primary-dark active:bg-primary-dark-bold active:text-primary-dark"
              onClick={() => handleOptionSelection('cpf')}
            >
              Editar
            </button>
          </div>
          <div className="flex flex-row items-center md:gap-2">
            <div className="gap 2 flex flex-col">
              <label className="font-bold">Senha</label>
              <input
                type="text"
                value={'***********'}
                className={`mb-4 w-fit max-w-[700px] cursor-no-drop rounded-md border-2 border-solid bg-[#FFFFFf]  px-2 py-2 hover:border-black `}
                disabled
              />
            </div>
            <button
              className="mt-2 flex max-h-[35px] w-fit max-w-[300px] cursor-pointer items-center rounded-md bg-primary pl-2 pr-2 hover:bg-primary-dark active:bg-primary-dark-bold active:text-primary-dark"
              onClick={() => handleOptionSelection('password')}
            >
              Editar
            </button>
          </div>
        </>
      )
    }
  }

  return (
    <div className={`${widthform}`}>
      <div className="flex flex-col items-center">
        <h1 className="m-4 text-xl font-bold">Conta</h1>
        {renderForm()}
      </div>
    </div>
  )
}
