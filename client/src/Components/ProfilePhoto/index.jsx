import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateAvatar } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";

function ProfilePhoto() {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [newFile, setNewFile] = useState("");
  const [avatar, setAvatar] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [imgIsLoaded, setImgIsLoaded] = useState(false);

  const user = useSelector((state) => state.auth.user);

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log(e.dataTransfer.files[0]);
      // handleFiles(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0]);
      setDragActive(false);
      setNewFile(e.target.files[0].name);
      setAvatar(e.target.files[0]);

      // handleFiles(e.target.files);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

  const handleUpdate = () => {
    try {
      console.log(avatar);
      const updatedAvatar = new FormData();
      updatedAvatar.append("avatar", avatar);
      console.log(updatedAvatar);
      dispatch(updateAvatar(updatedAvatar));
      toast("Изображение обновлено!");
      //setAvatar(`http://localhost:3002/${user.avatar}`);
      //setImgIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user?.avatar) {
      // http://localhost:3002/${user.avatar}
      setAvatar(`process.env.REACT_APP_IMG_URL${user?.avatar}`);
      setImgIsLoaded(true);
    }
  }, [user]);

  return (
    <div className="accountDataBlock">
      <h3 className="accTitle">Выбор фотографии</h3>
      {imgIsLoaded ? (
        <div className="downloadedImgBox">
          <img src={avatar} alt="" className="dowloadPhoto" />
          <button className="deleteImg" onClick={() => setImgIsLoaded(false)}>
            X
          </button>
        </div>
      ) : (
        <img src="noUimg" alt="" />
      )}

      {!imgIsLoaded && (
        <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
          <div className={`downloadArea ${dragActive ? "dragActiveClass" : ""}`}>
            <input
              ref={inputRef}
              type="file"
              id="input-file-upload"
              multiple={true}
              onChange={handleChange}
              className="fileInput"
            />
            <label
              id="label-file-upload"
              htmlFor="input-file-upload"
              className={dragActive ? "dragActiveClass" : ""}>
              <div>
                {newFile ? (
                  <p>{newFile}</p>
                ) : (
                  <p>Перетащите изображение в это поле или воспользуйтесь кнопкой загрузить</p>
                )}
                <button className="saveBtn changeImg" onClick={onButtonClick}>
                  Загрузить
                </button>
              </div>
            </label>
          </div>

          {dragActive && (
            <div
              id="drag-file-element"
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}></div>
          )}

          <div>
            <button type="submit" className="saveBtn " onClick={handleUpdate}>
              Сохранить
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ProfilePhoto;
