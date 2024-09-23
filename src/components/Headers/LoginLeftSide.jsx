
export default ({headerText,subtitle}) => {
     return <div className="flex-1 flex flex-column justify-content-start bg-blue-200">
     <div className="mx-5 mt-5 md:mt-8  text-center bg-red-100">
       <div>
            <h2 className="text-5xl">{headerText}</h2>
       </div>
        <div className="text-left text-lg mx-5">
            <p>
               {subtitle}
            </p>
        </div>
     </div>
</div>
}