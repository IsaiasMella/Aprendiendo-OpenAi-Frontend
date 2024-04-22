interface Props {
  userScore: number;
  errors: string[];
  message: string;
}

export const GptOrthographyMessage = ({ userScore, message, errors }: Props) => {
  return (
    <div className="col-start-1 col-end-9 p-3 rounded-lg">
      <div className="flex flex-row items-start">
        <div className="flex items-center justify-center h-10 w-10 rounded-full bg-green-600 flex-shrink-0">
          G
        </div>
        <div className="relative ml-3 text-sm bg-black bg-opacity-25 pt-3 pb-2 px-4 shadow rounded-xl">
          <h3 className="text-3xl">Tu puntaje es de {userScore}%</h3>
          <p>{message}</p>
          {errors?.length === 0 ? (
            <p>No se encontraron errores, excelente!!</p>
          ) : (
            <>
              <h3 className="text-3xl">Errores encontrados</h3>
              <ul>
                {errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
